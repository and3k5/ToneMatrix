var defaultSettings = {};

var settings = [];



function registerSetting(name, defaultValue, component) {
    settings.push({
        name: name,
        defaultValue: defaultValue,
        component: component,
    });
}

import number from "../components/settings/number.vue";

registerSetting("rowsCount",16,number);
registerSetting("buttonsCount",16,number);

for (var setting of settings) {
    defaultSettings[setting.name] = setting.defaultValue;
}

export const DefaultSettings = Object.freeze(defaultSettings);
export const Settings = Object.freeze(settings);

export function createSettings() {
    return Object.assign({}, DefaultSettings);
}

