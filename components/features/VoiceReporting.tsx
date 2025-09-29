
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob, LiveSession } from '@google/genai';
import { useTranslation } from '../../hooks/useTranslation';
import Button from '../ui/Button';
import { LoaderIcon, MicIcon } from '../ui/Icons';

// Helper functions for audio encoding, as per Gemini API guidelines
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const VoiceReporting: React.FC = () => {
    const { t } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const cleanupAudio = () => {
        if (scriptProcessorRef.current && audioContextRef.current) {
            scriptProcessorRef.current.disconnect(audioContextRef.current.destination);
            scriptProcessorRef.current = null;
        }
        if (mediaStreamSourceRef.current && scriptProcessorRef.current) {
            mediaStreamSourceRef.current.disconnect(scriptProcessorRef.current);
            mediaStreamSourceRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };
    
    const handleStopRecording = () => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        cleanupAudio();
        setIsRecording(false);
    };

    const handleStartRecording = async () => {
        setError(null);
        setTranscription('');
        setSubmissionStatus(null);
        setIsLoading(true);

        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (err) {
            console.error("Microphone access denied:", err);
            setError(t('voice_error_mic'));
            setIsLoading(false);
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        sessionPromiseRef.current = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    // FIX: Cast `window` to `any` to allow access to the vendor-prefixed `webkitAudioContext` for Safari compatibility, resolving the TypeScript error.
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                    mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(streamRef.current!);
                    scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
                    
                    scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        if (sessionPromiseRef.current) {
                             sessionPromiseRef.current.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        }
                    };

                    mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                    scriptProcessorRef.current.connect(audioContextRef.current.destination);
                    
                    setIsLoading(false);
                    setIsRecording(true);
                },
                onmessage: (message: LiveServerMessage) => {
                    if (message.serverContent?.inputTranscription) {
                        const text = message.serverContent.inputTranscription.text;
                        if(text) setTranscription(prev => prev + text);
                    }
                    if (message.serverContent?.turnComplete) {
                        setTranscription(prev => prev + ' ');
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error("API Error:", e);
                    setError(t('voice_error_api'));
                    handleStopRecording();
                },
                onclose: (e: CloseEvent) => {
                   cleanupAudio();
                   setIsRecording(false);
                },
            },
            config: {
                responseModalities: [Modality.AUDIO],
                inputAudioTranscription: {},
            },
        });
    };

    const handleSubmitReport = () => {
        if (!transcription) return;
        setIsSubmittingReport(true);
        setSubmissionStatus(null);
        // Simulate API call for submission
        setTimeout(() => {
            const success = Math.random() > 0.2;
            setIsSubmittingReport(false);
            setSubmissionStatus(success ? 'success' : 'error');
            if (success) {
                setTranscription(''); // Clear on success
            }
        }, 1500);
    };

    // Ensure cleanup on component unmount
    useEffect(() => {
        return () => handleStopRecording();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-center">
                {!isRecording ? (
                    <Button onClick={handleStartRecording} isLoading={isLoading} disabled={isLoading || isSubmittingReport} variant="primary" size="md">
                        <MicIcon className="w-5 h-5 mr-2"/>
                        {isLoading ? t('processing') : t('start_recording')}
                    </Button>
                ) : (
                    <Button onClick={handleStopRecording} variant="danger" size="md">
                         <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        {t('stop_recording')}
                    </Button>
                )}
            </div>

            {isRecording && (
                 <div className="flex justify-center items-center text-gray-500">
                    <LoaderIcon className="w-5 h-5 mr-2" />
                    <span>{t('recording')}</span>
                </div>
            )}

            {error && <p className="text-center text-sm text-error">{error}</p>}

            {transcription && !isRecording && (
                <div className="bg-base-200 p-3 rounded-lg space-y-3">
                    <h4 className="font-bold text-md text-primary">{t('transcription_result')}</h4>
                    <textarea
                        className="w-full bg-base-300 border-base-100 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary text-sm"
                        rows={4}
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                        aria-label="Transcription Result"
                    />
                    <Button onClick={handleSubmitReport} isLoading={isSubmittingReport} disabled={isSubmittingReport || !transcription.trim()} className="w-full">
                        {isSubmittingReport ? t('submitting_voice_report') : t('submit_voice_report')}
                    </Button>
                </div>
            )}

            {submissionStatus && (
                <div className="text-center text-sm mt-2">
                    {submissionStatus === 'success' && <p className="text-success">{t('submit_success')}</p>}
                    {submissionStatus === 'error' && <p className="text-error">{t('submit_error')}</p>}
                </div>
            )}
        </div>
    );
};

export default VoiceReporting;
