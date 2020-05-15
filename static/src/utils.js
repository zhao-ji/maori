import md5 from 'md5';

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

export async function baiduTranslate(kwargs) {
    const salt = Math.random() * 2 ** 16;
    const params = {
        appid: secrets.baiduAppId,
        salt: salt,
        sign: md5(secrets.baiduAppId + kwargs.text + salt + secrets.baiduSecretKey),
        q: kwargs.text,
        from: kwargs.language === "en" ? "en" : "mao",
        to: kwargs.language === "en" ? "mao" : "en",
    };
    let url = new URL(secrets.baiduUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    const data = await response.json();

    return data.trans_result[0].dst;
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

export async function maoriTranslate(text) {
    const params = { text };
    let url = new URL(secrets.maoriUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    const data = await response.json();
    return data;
}
