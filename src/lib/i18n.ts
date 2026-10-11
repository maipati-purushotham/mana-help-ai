

export const strings = {
    te: {
        appName: "మన హెల్ప్ AI",
        welcome:
            "నమస్కారం! మీకు ఏదైనా పేపర్ అర్థం కాకపోతే ఫోటో తీసి పంపండి. లేదా మీ ప్రశ్నను చెప్పండి. నేను సులభమైన తెలుగులో వివరించడానికి ప్రయత్నిస్తాను.",
        speakQuestion: "మీ ప్రశ్న చెప్పండి",
        stopRecording: "ఆపండి",
        uploadDocument: "పేపర్ ఫోటో పంపండి",
        typeQuestion: "ప్రశ్న టైప్ చేయండి",
        typePlaceholder: "ఇక్కడ టైప్ చేయండి...",
        submit: "పంపండి",
        listen: "వినండి",
        stop: "ఆపండి",
        retry: "మళ్ళీ ప్రయత్నించండి",
        remove: "తీసేయండి",
        analyze: "విశ్లేషించండి",
        analyzing: "చూస్తున్నాను...",
        exampleQuestions: "ఉదాహరణ ప్రశ్నలు",
        example1: "ఈ పేపర్ ఏమి చెప్తుంది?",
        example2: "నేను ఏమి చేయాలి?",
        example3: "డెడ్లైన్ ఎప్పుడు?",
        privacyNote: "మీ ఫోటో AI సేవకు పంపబడుతుంది. మేము దానిని సేవ్ చేయము.",
        micNotSupported:
            "ఈ బ్రౌజర్ వాయిస్ సపోర్ట్ చేయదు. దయచేసి టైప్ చేయండి.",
        fileTypeError: "ఈ ఫైల్ రకం మద్దతు లేదు. JPG, PNG, WEBP మాత్రమే.",
        fileSizeError: "ఫైల్ 5MB కంటే చిన్నదిగా ఉండాలి.",
        networkError: "ఇంటర్నెట్ సమస్య. మళ్ళీ ప్రయత్నించండి.",
    },
    en: {
        appName: "Mana Help AI",
        welcome:
            "Namaskaram! If you don't understand a paper, take a photo and send it. Or speak your question. I will try to explain in simple language.",
        speakQuestion: "Speak your question",
        stopRecording: "Stop",
        uploadDocument: "Upload a document",
        typeQuestion: "Type your question",
        typePlaceholder: "Type here...",
        submit: "Submit",
        listen: "Listen",
        stop: "Stop",
        retry: "Try again",
        remove: "Remove",
        analyze: "Analyze",
        analyzing: "Analyzing...",
        exampleQuestions: "Example questions",
        example1: "What does this paper say?",
        example2: "What should I do?",
        example3: "When is the deadline?",
        privacyNote: "Your photo will be sent to an AI service. We do not save it.",
        micNotSupported:
            "This browser does not support voice. Please type instead.",
        fileTypeError: "Unsupported file type. Only JPG, PNG, WEBP allowed.",
        fileSizeError: "File must be under 5MB.",
        networkError: "Network problem. Please try again.",
    },
} as const;

export type Lang = keyof typeof strings; 