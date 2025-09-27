
import React, { useState, useCallback } from 'react';
import { analyzeWaterImage } from '../../services/geminiService';
import Button from '../ui/Button';
import { LoaderIcon } from '../ui/Icons';
import { useTranslation } from '../../hooks/useTranslation';

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error('Failed to convert blob to base64'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


const ImageUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setAnalysisResult('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!file) return;

        setIsLoading(true);
        setAnalysisResult('');
        try {
            const base64Image = await blobToBase64(file);
            const result = await analyzeWaterImage(base64Image, file.type);
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            setAnalysisResult('An error occurred while processing the image.');
        } finally {
            setIsLoading(false);
        }
    }, [file]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-base-100 border-dashed rounded-lg cursor-pointer bg-base-200 hover:bg-base-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {preview ? (
                             <img src={preview} alt="Preview" className="h-48 w-auto object-contain rounded-lg"/>
                        ) : (
                            <>
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">{t('upload_prompt')}</span> {t('upload_prompt_sub')}</p>
                                <p className="text-xs text-gray-500">{t('upload_prompt_types')}</p>
                            </>
                        )}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                </label>
            </div>
            
            {file && (
                <div className="text-center">
                    <Button onClick={handleAnalyze} isLoading={isLoading} disabled={!file || isLoading}>
                        {isLoading ? t('analyzing_button') : t('analyze_button', { fileName: file.name })}
                    </Button>
                </div>
            )}

            {isLoading && (
                <div className="flex justify-center items-center">
                    <LoaderIcon className="w-8 h-8 text-primary"/>
                    <p className="ml-2">{t('analyzing_ai_message')}</p>
                </div>
            )}

            {analysisResult && (
                <div className="bg-base-200 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-primary mb-2">{t('analysis_result_title')}</h4>
                    <p className="text-base-content whitespace-pre-wrap">{analysisResult}</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
