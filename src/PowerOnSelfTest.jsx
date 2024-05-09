/* Power-On Self Test... for Webbous */

import packageJson from "../package.json";

function GetOperatingSystemDetails() {
    const platform = navigator.platform.toLowerCase();
    let osName = '';
    let osVersion = '';

    if (platform.includes('win')) {
        osName = 'Windows';
        osVersion = GetWindowsVersion();
    } else if (platform.includes('mac')) {
        osName = 'macOS';
        osVersion = GetMacOSVersion();
    } else if (platform.includes('linux')) {
        osName = 'Linux';
    } else {
        osName = 'Unknown';
    }

    return { name: osName, version: osVersion };
}

function GetWindowsVersion() {
    const userAgent = window.navigator.userAgent;
    const match = userAgent.match(/Windows NT (\d+)\.(\d+)/);
    if (match) {
        const majorVersion = parseInt(match[1]);
        const minorVersion = parseInt(match[2]);
        if (majorVersion === 10 && minorVersion >= 0) {
            return "10 or 11";
        } else {
            return match[1] + "." + match[2]; // Return original version if not Windows 10 or 11
        }
    } else {
        return '';
    }
}


function GetMacOSVersion() {
    return window.navigator.platform.includes('Mac') ? window.navigator.platform : '';
}

function GetBrowserName() {
    const ua = navigator.userAgent;
    if (/Opera|OPR/.test(ua)) return 'Opera';
    if (/Edg/.test(ua)) return 'Edge';
    if (/Chrome/.test(ua)) return 'Chrome';
    if (/Safari/.test(ua)) return 'Safari';
    if (/Firefox/.test(ua)) return 'Firefox';
    if (/MSIE|Trident\//.test(ua)) return 'IE';
    return 'unknown';
}

function PrintBrowserAndOSInfo() {
    const userAgent = navigator.userAgent;
    const os = GetOperatingSystemDetails();
    return (
        <div>
            <p>Running Webbous on <code>{GetBrowserName()}</code> for <code>{os.name} {os.version}</code></p>
            <p>User-Agent String: <code>{userAgent}</code></p>
        </div>
    );
}

export default function PowerOnSelfTest() {
    const webbousVersion = packageJson.version;
    return (
        <div>
            <p>This is Webbous, version {webbousVersion}.</p>
            <PrintBrowserAndOSInfo />
        </div>
    );
}