export const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  te: 'తెలుగు (Telugu)',
  kn: 'ಕನ್ನಡ (Kannada)',
  mr: 'मराठी (Marathi)',
  gu: 'ગુજરાતી (Gujarati)',
  ta: 'தமிழ் (Tamil)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
};

export const DEFAULT_LANGUAGE = 'en';

type TranslationKeys = {
    // Navbar
    notifications: string;
    welcome: string;
    logout: string;
    login: string;
    signup: string;
    // Login Modal
    login_modal_title: string;
    login_modal_desc: string;
    user_role_label: string;
    role_user: string;
    role_asha: string;
    role_official: string;
    login_as: string;
    email: string;
    password: string;
    name: string;
    signup_prompt: string;
    login_prompt: string;
    // Dashboards
    public_dashboard_title: string;
    user_dashboard_title: string;
    asha_dashboard_title: string;
    official_dashboard_title: string;
    // Public Dashboard Cards
    risk_hotspots_title: string;
    risk_hotspots_desc: string;
    ai_prediction_title: string;
    ai_prediction_desc: string;
    analyzing_data: string;
    refresh_analysis: string;
    re_analyzing: string;
    data_trends_title: string;
    system_flow_title: string;
    precautions_title: string;
    precautions_individuals_title: string;
    precautions_individuals_1: string;
    precautions_individuals_2: string;
    precautions_individuals_3: string;
    precautions_individuals_4: string;
    precautions_communities_title: string;
    precautions_communities_1: string;
    precautions_communities_2: string;
    precautions_communities_3: string;
    precautions_communities_4: string;
    precautions_help_title: string;
    precautions_help_1: string;
    precautions_help_2: string;
    precautions_help_3: string;
    precautions_help_4: string;
    precautions_response_title: string;
    precautions_response_1: string;
    precautions_response_2: string;
    precautions_response_3: string;
    precautions_response_4: string;
    // User Dashboard
    analyze_water_image_title: string;
    analyze_water_image_desc: string;
    analyze_water_image_disclaimer: string;
    // Asha Dashboard
    submit_water_report_title: string;
    submit_disease_report_title: string;
    gamification_title: string;
    reports_submitted: string;
    points_earned: string;
    badges_earned: string;
    voice_reporting_title: string;
    voice_reporting_desc: string;
    send_alert_title: string;
    send_alert_desc: string;
    // Official Dashboard
    active_alerts_title: string;
    th_risk: string;
    th_alert: string;
    th_location: string;
    th_status: string;
    th_actions: string;
    action_verify: string;
    action_resolve: string;
    action_unresolved: string;
    // Image Upload
    upload_prompt: string;
    upload_prompt_sub: string;
    upload_prompt_types: string;
    analyze_button: string;
    analyzing_button: string;
    analyzing_ai_message: string;
    analysis_result_title: string;
    // Data Submission Form
    label_location: string;
    label_ph: string;
    label_turbidity: string;
    label_bacteria: string;
    label_disease: string;
    label_case_count: string;
    disease_placeholder: string;
    submit_report_button: string;
    submitting_button: string;
    submit_success: string;
    submit_error: string;
    // Voice Reporting
    start_recording: string;
    stop_recording: string;
    recording: string;
    processing: string;
    transcription_result: string;
    voice_error_mic: string;
    voice_error_api: string;
    submit_voice_report: string;
    submitting_voice_report: string;
    // Send Alert Form
    label_alert_type: string;
    alert_type_sms: string;
    alert_type_official: string;
    label_message: string;
    send_alert_button: string;
    sending_alert_button: string;
    alert_send_success: string;
    alert_send_error: string;
    sms_send_success: string;
    // Trend Chart
    chart_water_title: string;
    chart_disease_title: string;
    // AI Chart Update
    ai_chart_update_title: string;
    ai_chart_update_desc: string;
    get_ai_update_button: string;
    getting_ai_update_button: string;
    // Latest Reports
    latest_reports_title: string;
    download_pdf: string;
    report_type_water: string;
    report_type_disease: string;
    // Image Gallery
    image_gallery_title: string;
    image_gallery_desc: string;
    // System Flowchart
    flow_start: string;
    flow_iot: string;
    flow_iot_desc: string;
    flow_cv: string;
    flow_cv_desc: string;
    flow_voice: string;
    flow_voice_desc: string;
    flow_blockchain: string;
    flow_blockchain_desc: string;
    flow_ai: string;
    flow_ai_desc: string;
    flow_dashboard: string;
    flow_dashboard_desc: string;
    flow_gamification: string;
    flow_gamification_desc: string;
    flow_impact: string;
    flow_impact_1: string;
    flow_impact_2: string;
    flow_impact_3: string;
    flow_end: string;
};

export const translations: { [key: string]: TranslationKeys } = {
    en: {
        notifications: 'Notifications',
        welcome: 'Welcome, {{name}}',
        logout: 'Logout',
        login: 'Login',
        signup: 'Sign Up',
        login_modal_title: 'Login to Your Account',
        login_modal_desc: 'Enter your credentials to access your dashboard.',
        user_role_label: 'Select Your Role',
        role_user: 'Standard User',
        role_asha: 'ASHA Worker / Volunteer',
        role_official: 'District Official',
        login_as: 'Login as {{role}}',
        email: 'Email Address',
        password: 'Password',
        name: 'Full Name',
        signup_prompt: "Don't have an account?",
        login_prompt: 'Already have an account?',
        public_dashboard_title: 'Water Health Dashboard: Northeast India Focus',
        user_dashboard_title: 'Your Dashboard',
        asha_dashboard_title: 'ASHA Worker & Volunteer Portal',
        official_dashboard_title: 'Official Alert Management',
        risk_hotspots_title: 'Regional Risk Hotspots',
        risk_hotspots_desc: 'Interactive map showing areas with reported water quality issues. Red indicates high risk, orange medium, and green low. While the globe shows global data, our current focus is on Northeast India.',
        ai_prediction_title: 'AI Outbreak Prediction: Northeast India',
        ai_prediction_desc: 'Gemini AI analysis of regional data to detect anomalies and predict potential outbreaks. Predicted high-risk areas are marked directly on the globe.',
        analyzing_data: 'Analyzing latest regional data...',
        refresh_analysis: 'Refresh Analysis',
        re_analyzing: 'Re-analyzing...',
        data_trends_title: 'Data Trends in Northeast India',
        system_flow_title: 'How It Works: Our System Architecture',
        precautions_title: 'Precautions & Regional Guidelines',
        precautions_individuals_title: 'For Individuals',
        precautions_individuals_1: 'Drink only boiled, filtered, or purified water.',
        precautions_individuals_2: 'Wash hands frequently with soap, especially before eating.',
        precautions_individuals_3: 'Ensure food is cooked thoroughly and eaten hot.',
        precautions_individuals_4: 'Get vaccinated for Typhoid and Hepatitis A if possible.',
        precautions_communities_title: 'For Communities',
        precautions_communities_1: 'Protect and maintain community water sources (wells, springs).',
        precautions_communities_2: 'Report any water pipeline leakages to authorities.',
        precautions_communities_3: 'Promote proper sanitation and waste disposal.',
        precautions_communities_4: 'Consult ASHA workers for health information.',
        precautions_help_title: 'When to Seek Help',
        precautions_help_1: 'Severe watery diarrhea (symptom of Cholera).',
        precautions_help_2: 'Prolonged high fever (symptom of Typhoid).',
        precautions_help_3: 'Jaundice - yellowing of eyes/skin (symptom of Hepatitis).',
        precautions_help_4: 'Immediately contact local health centers.',
        precautions_response_title: 'Regional Response',
        precautions_response_1: 'Integrated surveillance systems are crucial for tracking outbreaks.',
        precautions_response_2: 'Initiatives like ICMR-FoodNet help generate real-time data.',
        precautions_response_3: 'Improved sanitation is key to preventing disease spread.',
        precautions_response_4: 'Addressing malnutrition can reduce disease severity.',
        analyze_water_image_title: 'Analyze Water Sample Image',
        analyze_water_image_desc: 'Upload a photo of a water sample for a quick visual analysis by our AI. This can help identify potential issues like turbidity or unusual coloring.',
        analyze_water_image_disclaimer: 'Disclaimer: This is not a substitute for professional lab testing.',
        submit_water_report_title: 'Submit Water Quality Report',
        submit_disease_report_title: 'Submit Disease Case Report',
        gamification_title: "Your Activity",
        reports_submitted: "Reports Submitted",
        points_earned: "Points Earned",
        badges_earned: "Badges Earned",
        voice_reporting_title: "Submit Report by Voice",
        voice_reporting_desc: "Record your report in your local dialect. The system will transcribe it automatically.",
        send_alert_title: "Send Community Alert",
        send_alert_desc: "Send an SMS or official alert to the community or authorities regarding a water quality issue.",
        active_alerts_title: 'Active Alerts',
        th_risk: 'Risk',
        th_alert: 'Alert',
        th_location: 'Location',
        th_status: 'Status',
        th_actions: 'Actions',
        action_verify: 'Verify',
        action_resolve: 'Resolve',
        action_unresolved: 'Unresolved',
        upload_prompt: 'Click to upload',
        upload_prompt_sub: 'or drag and drop',
        upload_prompt_types: 'PNG, JPG, or WEBP',
        analyze_button: 'Analyze {{fileName}}',
        analyzing_button: 'Analyzing...',
        analyzing_ai_message: 'AI is analyzing the image...',
        analysis_result_title: 'Analysis Result:',
        label_location: 'Location',
        label_ph: 'pH Level',
        label_turbidity: 'Turbidity (NTU)',
        label_bacteria: 'Bacteria (CFU/100mL)',
        label_disease: 'Disease',
        label_case_count: 'Number of Cases',
        disease_placeholder: 'e.g., Diarrhea, Typhoid, Hepatitis',
        submit_report_button: 'Submit Report',
        submitting_button: 'Submitting...',
        submit_success: 'Report submitted successfully!',
        submit_error: 'Submission failed. Please try again.',
        start_recording: 'Start Recording',
        stop_recording: 'Stop Recording',
        recording: 'Recording...',
        processing: 'Processing...',
        transcription_result: 'Transcription:',
        voice_error_mic: 'Microphone access denied. Please enable it in your browser settings.',
        voice_error_api: 'An API error occurred. Please try again.',
        submit_voice_report: "Submit Transcribed Report",
        submitting_voice_report: "Submitting...",
        label_alert_type: "Alert Type",
        alert_type_sms: "Community SMS",
        alert_type_official: "Official Alert",
        label_message: "Message",
        send_alert_button: "Send Alert",
        sending_alert_button: "Sending...",
        alert_send_success: "Alert sent successfully!",
        alert_send_error: "Failed to send alert. Please try again.",
        sms_send_success: "SMS alerts successfully sent to {{count}} people in {{location}}.",
        chart_water_title: 'Water Quality Trends',
        chart_disease_title: 'Daily Disease Cases',
        ai_chart_update_title: 'AI-Powered Daily Updates',
        ai_chart_update_desc: "Charts are updated based on AI analysis of daily news. Click to fetch the latest insights.",
        get_ai_update_button: "Get Today's AI Update",
        getting_ai_update_button: "Getting Update...",
        latest_reports_title: "Latest ASHA Worker Reports",
        download_pdf: "Download PDF",
        report_type_water: "Water Quality",
        report_type_disease: "Disease Case",
        image_gallery_title: "Northeast India: Water Sources Gallery",
        image_gallery_desc: "A visual collection of key water bodies across the region, highlighting their natural beauty and importance to local communities.",
        flow_start: 'Start',
        flow_iot: 'IoT Sensors',
        flow_iot_desc: '(TDS, BOD, Turbidity)',
        flow_cv: 'Computer Vision',
        flow_cv_desc: '(Water Strip Photos)',
        flow_voice: 'Voice Reporting',
        flow_voice_desc: '(Local Dialects)',
        flow_blockchain: 'Blockchain Ledger',
        flow_blockchain_desc: '+ Smart Contracts',
        flow_ai: 'AI/ML Prediction',
        flow_ai_desc: '(3-7 Days Early Warning)',
        flow_dashboard: 'Alerts and Dashboard',
        flow_dashboard_desc: '(Community + Gov)',
        flow_gamification: 'Gamification',
        flow_gamification_desc: '(Rewards for ASHA)',
        flow_impact: 'Impact',
        flow_impact_1: 'Early Detection',
        flow_impact_2: 'Transparency',
        flow_impact_3: 'Better Health',
        flow_end: 'End',
    },
    hi: {
        notifications: 'सूचनाएं',
        welcome: 'स्वागत है, {{name}}',
        logout: 'लॉग आउट',
        login: 'लॉग इन करें',
        signup: 'साइन अप करें',
        login_modal_title: 'अपने खाते में પ્રવેશ करें',
        login_modal_desc: 'अपने डैशबोर्ड तक पहुंचने के लिए अपनी क्रेडेंशियल दर्ज करें।',
        user_role_label: 'अपनी भूमिका चुनें',
        role_user: 'मानक उपयोगकर्ता',
        role_asha: 'आशा कार्यकर्ता / स्वयंसेवक',
        role_official: 'जिला अधिकारी',
        login_as: '{{role}} के रूप में लॉगिन करें',
        email: 'ईमेल पता',
        password: 'पासवर्ड',
        name: 'पूरा नाम',
        signup_prompt: 'खाता नहीं है?',
        login_prompt: 'पहले से ही एक खाता है?',
        public_dashboard_title: 'जल स्वास्थ्य डैशबोर्ड: पूर्वोत्तर भारत फोकस',
        user_dashboard_title: 'आपका डैशबोर्ड',
        asha_dashboard_title: 'आशा कार्यकर्ता और स्वयंसेवक पोर्टल',
        official_dashboard_title: 'आधिकारिक चेतावनी प्रबंधन',
        risk_hotspots_title: 'क्षेत्रीय जोखिम हॉटस्पॉट',
        risk_hotspots_desc: 'पानी की गुणवत्ता संबंधी समस्याओं वाले क्षेत्रों को दिखाने वाला इंटरेक्टिव मानचित्र। लाल उच्च जोखिम, नारंगी मध्यम और हरा निम्न जोखिम दर्शाता है। हमारा वर्तमान ध्यान पूर्वोत्तर भारत पर है।',
        ai_prediction_title: 'एआई प्रकोप भविष्यवाणी: पूर्वोत्तर भारत',
        ai_prediction_desc: 'विसंगतियों का पता लगाने और संभावित प्रकोपों की भविष्यवाणी करने के लिए क्षेत्रीय डेटा का जेमिनी एआई विश्लेषण। अनुमानित उच्च जोखिम वाले क्षेत्रों को सीधे ग्लोब पर चिह्नित किया गया है।',
        analyzing_data: 'नवीनतम क्षेत्रीय डेटा का विश्लेषण किया जा रहा है...',
        refresh_analysis: 'विश्लेषण ताज़ा करें',
        re_analyzing: 'पुनः विश्लेषण किया जा रहा है...',
        data_trends_title: 'पूर्वोत्तर भारत में डेटा रुझान',
        system_flow_title: 'यह कैसे काम करता है: हमारी सिस्टम वास्तुकला',
        precautions_title: 'सावधानियां और क्षेत्रीय दिशानिर्देश',
        precautions_individuals_title: 'व्यक्तियों के लिए',
        precautions_individuals_1: 'केवल उबला हुआ, फ़िल्टर किया हुआ या शुद्ध पानी पिएं।',
        precautions_individuals_2: 'बार-बार साबुन से हाथ धोएं, खासकर खाने से पहले।',
        precautions_individuals_3: ' सुनिश्चित करें कि भोजन अच्छी तरह से पका हो और गर्म खाया जाए।',
        precautions_individuals_4: 'यदि संभव हो तो टाइफाइड और हेपेटाइटिस ए का टीका लगवाएं।',
        precautions_communities_title: 'समुदायों के लिए',
        precautions_communities_1: 'सामुदायिक जल स्रोतों (कुओं, झरनों) की रक्षा और रखरखाव करें।',
        precautions_communities_2: 'किसी भी पानी की पाइपलाइन रिसाव की सूचना अधिकारियों को दें।',
        precautions_communities_3: 'उचित स्वच्छता और अपशिष्ट निपटान को बढ़ावा दें।',
        precautions_communities_4: 'स्वास्थ्य संबंधी जानकारी के लिए आशा कार्यकर्ताओं से सलाह लें।',
        precautions_help_title: 'मदद कब लें',
        precautions_help_1: 'गंभीर पानी जैसा दस्त (हैजा का लक्षण)।',
        precautions_help_2: 'लंबे समय तक तेज बुखार (टाइफाइड का लक्षण)।',
        precautions_help_3: 'पीलिया - आंखों/त्वचा का पीला पड़ना (हेपेटाइटिस का लक्षण)।',
        precautions_help_4: 'तुरंत स्थानीय स्वास्थ्य केंद्रों से संपर्क करें।',
        precautions_response_title: 'क्षेत्रीय प्रतिक्रिया',
        precautions_response_1: 'प्रकोपों पर नज़र रखने के लिए एकीकृत निगरानी प्रणालियाँ महत्वपूर्ण हैं।',
        precautions_response_2: 'आईसीएमआर-फूडनेट जैसी पहलें वास्तविक समय डेटा उत्पन्न करने में मदद करती हैं।',
        precautions_response_3: 'बीमारी के प्रसार को रोकने के लिए बेहतर स्वच्छता महत्वपूर्ण है।',
        precautions_response_4: 'कुपोषण को दूर करने से बीमारी की गंभीरता कम हो सकती है।',
        analyze_water_image_title: 'पानी के नमूने की छवि का विश्लेषण करें',
        analyze_water_image_desc: 'हमारे एआई द्वारा त्वरित दृश्य विश्लेषण के लिए पानी के नमूने की एक तस्वीर अपलोड करें। यह टर्बिडिटी या असामान्य रंग जैसी संभावित समस्याओं की पहचान करने में मदद कर सकता है।',
        analyze_water_image_disclaimer: 'अस्वीकरण: यह पेशेवर प्रयोगशाला परीक्षण का विकल्प नहीं है।',
        submit_water_report_title: 'पानी की गुणवत्ता रिपोर्ट जमा करें',
        submit_disease_report_title: 'रोग मामले की रिपोर्ट जमा करें',
        gamification_title: "आपकी गतिविधि",
        reports_submitted: "रिपोर्ट प्रस्तुत की गई",
        points_earned: "अंक अर्जित",
        badges_earned: "बैज अर्जित",
        voice_reporting_title: "आवाज द्वारा रिपोर्ट जमा करें",
        voice_reporting_desc: "अपनी रिपोर्ट अपनी स्थानीय बोली में रिकॉर्ड करें। सिस्टम इसे स्वचालित रूप से लिखित रूप में बदल देगा।",
        send_alert_title: "सामुदायिक चेतावनी भेजें",
        send_alert_desc: "पानी की गुणवत्ता के मुद्दे के बारे में समुदाय या अधिकारियों को एक एसएमएस या आधिकारिक चेतावनी भेजें।",
        active_alerts_title: 'सक्रिय अलर्ट',
        th_risk: 'जोखिम',
        th_alert: 'चेतावनी',
        th_location: 'स्थान',
        th_status: 'स्थिति',
        th_actions: 'कार्रवाइयाँ',
        action_verify: 'सत्यापित करें',
        action_resolve: 'समाधान करें',
        action_unresolved: 'अनसुलझा',
        upload_prompt: 'अपलोड करने के लिए क्लिक करें',
        upload_prompt_sub: 'या खींच कर छोड़ें',
        upload_prompt_types: 'पीएनजी, जेपीजी, या वेबपी',
        analyze_button: '{{fileName}} का विश्लेषण करें',
        analyzing_button: 'विश्लेषण हो रहा है...',
        analyzing_ai_message: 'एआई छवि का विश्लेषण कर रहा है...',
        analysis_result_title: 'विश्लेषण परिणाम:',
        label_location: 'स्थान',
        label_ph: 'पीएच स्तर',
        label_turbidity: 'टर्बिडिटी (एनटीयू)',
        label_bacteria: 'बैक्टीरिया (सीएफयू/100एमएल)',
        label_disease: 'रोग',
        label_case_count: 'मामलों की संख्या',
        disease_placeholder: 'जैसे, दस्त, टाइफाइड, हेपेटाइटिस',
        submit_report_button: 'रिपोर्ट जमा करें',
        submitting_button: 'जमा हो रहा है...',
        submit_success: 'रिपोर्ट सफलतापूर्वक सबमिट की गई!',
        submit_error: 'सबमिशन विफल। कृपया पुनः प्रयास करें।',
        start_recording: 'रिकॉर्डिंग शुरू करें',
        stop_recording: 'रिकॉर्डिंग बंद करें',
        recording: 'रिकॉर्डिंग हो रही है...',
        processing: 'संसाधित हो रहा है...',
        transcription_result: 'प्रतिलेखन:',
        voice_error_mic: 'माइक्रोफ़ोन एक्सेस अस्वीकृत। कृपया इसे अपनी ब्राउज़र सेटिंग्स में सक्षम करें।',
        voice_error_api: 'एक एपीआई त्रुटि हुई। कृपया पुन: प्रयास करें।',
        submit_voice_report: "प्रतिलेखित रिपोर्ट जमा करें",
        submitting_voice_report: "जमा हो रहा है...",
        label_alert_type: "चेतावनी का प्रकार",
        alert_type_sms: "सामुदायिक एसएमएस",
        alert_type_official: "आधिकारिक चेतावनी",
        label_message: "संदेश",
        send_alert_button: "चेतावनी भेजें",
        sending_alert_button: "भेजा जा रहा है...",
        alert_send_success: "चेतावनी सफलतापूर्वक भेजी गई!",
        alert_send_error: "चेतावनी भेजने में विफल। कृपया पुनः प्रयास करें।",
        sms_send_success: "{{location}} में {{count}} लोगों को सफलतापूर्वक एसएमएस अलर्ट भेजे गए।",
        chart_water_title: 'पानी की गुणवत्ता के रुझान',
        chart_disease_title: 'दैनिक रोग के मामले',
        ai_chart_update_title: 'एआई-संचालित दैनिक अपडेट',
        ai_chart_update_desc: "चार्ट दैनिक समाचारों के एआई विश्लेषण के आधार पर अपडेट किए जाते हैं। नवीनतम जानकारी प्राप्त करने के लिए क्लिक करें।",
        get_ai_update_button: "आज का एआई अपडेट प्राप्त करें",
        getting_ai_update_button: "अपडेट हो रहा है...",
        latest_reports_title: "नवीनतम आशा कार्यकर्ता रिपोर्ट",
        download_pdf: "पीडीएफ डाउनलोड करें",
        report_type_water: "पानी की गुणवत्ता",
        report_type_disease: "रोग मामला",
        image_gallery_title: "पूर्वोत्तर भारत: जल स्रोत गैलरी",
        image_gallery_desc: "क्षेत्र भर के प्रमुख जल निकायों का एक दृश्य संग्रह, जो उनकी प्राकृतिक सुंदरता और स्थानीय समुदायों के लिए उनके महत्व को उजागर करता है।",
        flow_start: 'शुरू',
        flow_iot: 'आईओटी सेंसर',
        flow_iot_desc: '(टीडीएस, बीओडी, टर्बिडिटी)',
        flow_cv: 'कंप्यूटर विजन',
        flow_cv_desc: '(पानी की पट्टी की तस्वीरें)',
        flow_voice: 'वॉयस रिपोर्टिंग',
        flow_voice_desc: '(स्थानीय बोलियाँ)',
        flow_blockchain: 'ब्लॉकचेन लेजर',
        flow_blockchain_desc: '+ स्मार्ट अनुबंध',
        flow_ai: 'एआई/एमएल भविष्यवाणी',
        flow_ai_desc: '(3-7 दिन पूर्व चेतावनी)',
        flow_dashboard: 'अलर्ट और डैशबोर्ड',
        flow_dashboard_desc: '(समुदाय + सरकार)',
        flow_gamification: 'गेमिफिकेशन',
        flow_gamification_desc: '(आशा के लिए पुरस्कार)',
        flow_impact: 'प्रभाव',
        flow_impact_1: 'जल्दी पता लगाना',
        flow_impact_2: 'पारदर्शिता',
        flow_impact_3: 'बेहतर स्वास्थ्य',
        flow_end: 'समाप्त',
    },
};