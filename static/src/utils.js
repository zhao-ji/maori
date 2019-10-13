import secrets from "./secrets";

export async function googleTranslate(kwargs) {
    const params = {
        key: secrets.googleKey,
        q: kwargs.text,
        from: kwargs.language === "en" ? "en" : "mi",
        target: kwargs.language === "en" ? "mi" : "en",
    };
    let url = new URL(secrets.googleTranslateUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    const data = await response.json();
    return data.data.translations[0].translatedText;
}

export async function googleDetect(text) {
    const params = {
        key: secrets.googleKey,
        q: text,
    };
    let url = new URL(secrets.googleDetectUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    const data = await response.json();
    return data.data.detections[0][0]["language"];
}

export async function maoriTranslate(kwargs) {
    const params = {
        key: secrets.googleKey,
        q: kwargs.text,
        from: kwargs.language === "en" ? "en" : "mi",
        target: kwargs.language === "en" ? "mi" : "en",
    };
    let url = new URL(secrets.googleTranslateUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    const data = await response.json();
    return data.data.translations[0].translatedText;
}
