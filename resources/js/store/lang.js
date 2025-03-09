import Cookies from 'js-cookie'
import {defineStore} from "pinia";
import {ref} from "vue";

export const useLangStore = defineStore('lang', () => {
    const { locale, locales } = window.config
    const langLocale = ref(getLocale(locales, locale))
    const langLocales = locales

    const setLocale = (newLocale) => {
        langLocale.value = newLocale
        Cookies.set('locale', newLocale, { expires: 365 })
        updateHtmlLang(newLocale)
        toggleRtl(newLocale)
    }

    // Apply RTL settings on initial load
    updateHtmlLang(langLocale.value)
    toggleRtl(langLocale.value)

    return { langLocale, langLocales, setLocale }
}, {
    persist: true
})

/**
 * @param  {String[]} locales
 * @param  {String} fallback
 * @return {String}
 */
function getLocale (locales, fallback) {
    const locale = Cookies.get('locale')

    if (Object.prototype.hasOwnProperty.call(locales, locale)) {
        return locale
    } else if (locale) {
        Cookies.remove('locale')
    }

    return fallback
}

/**
 * Update the lang attribute of the HTML tag
 * @param {String} locale
 */
function updateHtmlLang(locale) {
    document.documentElement.lang = locale
}

/**
 * Toggle RTL class based on the locale
 * @param {String} locale
 */
function toggleRtl(locale) {
    const rtlLocales = ['ar', 'he', 'fa', 'ur'] // Add other RTL locales as needed
    if (rtlLocales.includes(locale)) {
        document.documentElement.classList.add('rtl')
    } else {
        document.documentElement.classList.remove('rtl')
    }
}