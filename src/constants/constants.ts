/* APP */
import { AllFileTypes } from 'types/general';
// export const REKODI_SITE_URL = process.env.NEXT_PUBLIC_REKODI_SITE_URL ?? "";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const NEXUS_KEY = process.env.NEXT_PUBLIC_I18NEXUS_KEY ?? "";
export const STORE_TOKEN = 'access_app_token';
export const API_SUCCESS = "success";
export const API_FAIL = "error";
export const API_NETWORK_FAIL = "ERR_NETWORK";
export const APP_VERSION = '1.0.0'
// export const APP_TIMEZONES = Intl.supportedValuesOf('timeZone')
export const APP_TIMEZONES = []
export let APP_LOCALE = process.env.NEXT_PUBLIC_APP_LOCALE ?? "en";
export let APP_TIMEZONE = 'Africa/Lagos'
export let APP_CURRENCY = 'NGN'
export let APP_COUNTRY = 'ng'
export const APP_THEME = 'appTheme'
export const APP_CONSTANTS = {
    setTimezone: (value: string) => {
        APP_TIMEZONE = value
    },
    setCurrency: (value: string) => {
        APP_CURRENCY = value
    },
    setLocale: (value: string) => {
        APP_LOCALE = value
    },
}


/* RESOURCES */
export const SEXES = [
    { name: "Male", code: 'MALE' },
    { name: "Female", code: 'FEMALE' },
]


/* STATUSES */
export const STATUS_MAP = {
    positive: ['active', 'good', 'accepted', 'successful', 'yes', 'approved', 'passed', true],
    pending: ['pending', 'processing', 'reviewing'],
    negative: ['unavailable', 'inactive', 'bad', 'rejected', 'failed', 'no', 'denied', 'failed', false],
    other: ['available', 'unresolved'],
}


/* GLOBAL VARIABLES */
export const DEBOUNCE_INPUT_DELAY = 800;
export const DATE_FORMAT = 'DD-MM-YYYY'


/* FILES */
export const MAX_FILE_SIZE = 10485760
export const FILE_TYPES = Object.values(AllFileTypes)
