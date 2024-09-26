import { AllFileTypes, SortType } from '../types/general';
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { APP_CURRENCY, APP_TIMEZONE, FILE_TYPES, MAX_FILE_SIZE } from 'constants/constants'
dayjs.extend(advancedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)


export function getNestedValue(obj: any, propertyPath: string = '') {
    const properties = propertyPath.split(".");
    let value = obj;
    for (const prop of properties) {
        if (value && typeof value === "object") {
            value = value[prop];
        } else {
            return undefined;
        }
    }
    return value;
}

/* Format */
export function removeWhiteSpace(str: string = '') {
    return String(str ?? '').replace(' ', '')
}
export function allCaps(text?: string | number) {
    return String(text ?? '').toUpperCase()
}
export function allLower(text?: string | number) {
    return String(text ?? '').toLowerCase()
}
export const camelCase = (text: string = '', splitter: string = ' ') => {
    return String(text).split(splitter).map(e => e.charAt(0).toLowerCase() + String(text).slice(1)).join(splitter)
}
export function capCase(text: string = '', splitter: string = ' ') {
    if (text === '' || text === null || text === 'null') {
        return ''
    }
    let newStr = String(text).split(splitter)
    return newStr.map(e => `${allCaps(e[0])}${allLower(e.slice(1))}`).join(' ')
}
export function joinString(text: string, splitter: string = ' ', joiner: string = '-', casing: 'upper' | 'lower' = 'lower') {
    const word = String(text).split(splitter).join(joiner)
    return casing === 'lower' ? word.toLowerCase() : word.toUpperCase()
}

export function dayDate(d?: Dayjs | string | Date) {
    return dayjs.utc(d).tz(APP_TIMEZONE)
}

export function dayFormat(d: string) {
    return dayDate(d).format('YYYY-MM-DD')
}

export function dayISOFormat(d: string | number | Date | null | undefined) {
    return dayDate(new Date(d ?? '').toString())
}

export const generateYears = (start = 1990) => {
    const arr = []
    const currentYear = dayDate().year()
    for (let i = start; i < currentYear; i++){
        arr.push(i)
    }
    return arr
}
export function inputDateFormat(date: string | Dayjs = '') {
    return date ? dayDate(date).format("YYYY-MM-DD") : '' 
}
export function prettyDateFormat(date: string | Dayjs = '') {
    return date ? dayDate(date).format("ll") : '' 
}
export const currencyFormat = ({ total = 0, currency = APP_CURRENCY, decimal }: { total: number, currency?: string, decimal?: number }) => {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: decimal ?? 0,
        maximumFractionDigits: decimal ?? 0,
    }).format(total);
};


/* Sort */
const compareAlpha = (a = '', b = '') => {
    const nameA = String(a).toUpperCase();
    const nameB = String(b).toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}
export const alphaSort = (arr: any[] = [], keyToCompare = '') => {
    const newArr = [...arr]
    return newArr.sort((a, b) => compareAlpha(!!keyToCompare ? a[keyToCompare] : a, !!keyToCompare ? b[keyToCompare] : b))
}
export const numSort = (arr = [], keyToCompare = '', order: SortType) => {
    if (order === 'asc') {
        return arr.sort((a, b) => ((keyToCompare ? a[keyToCompare] : a) - (keyToCompare ? b[keyToCompare] : b)))
    } else {
        return arr.sort((a, b) => ((keyToCompare ? b[keyToCompare] : b) - (keyToCompare ? a[keyToCompare] : a)))
    }
}
export const dateSort = (arr = [], key = '', order: SortType) => {
    if (order === 'desc') {
        return arr.sort((a, b) => Number(dayDate(b[key]).format('X')) - Number(dayDate(a[key]).format('X')))
    } else {
        return arr.sort((a, b) => Number(dayDate(a[key]).format('X')) - Number(dayDate(b[key]).format('X')))
    }
}


/* Forms */
export function isObjectPropsEmpty(obj: { [k: string]: any } = {}) {
    const keys = Object.keys(obj)
    if (keys.length > 0) {
        return keys.every(k => obj[k] === '' || !obj[k])
    }
    return true
}

export const xPropsValid = (obj: { [k: string]: any }, num: number) => {
    const keys = Object.keys(obj)
    return keys.filter(k => obj[k] !== '' && obj[k] != null && obj[k] !== undefined).length >= num
}

export function isObject(obj: {}) {
    return typeof obj === 'object' ? true : Object.keys(obj).length > 0 ? true : false
}

export function isEmptyObject(obj: any) {
    return Object.keys(obj).length <= 0
}

export const removeWords = (sentence: string = '', arrOfWords: string[] = [], ignoreCase?: boolean) => {
    let result = String(sentence)
    arrOfWords.forEach(w => {
        result = result.replace(RegExp(w, ignoreCase ? 'ig' : 'g'), "").trim()
    })
    return result
}

export const formatErrorObject = (errors: any = {}) => {
    let newObj: any = {}
    const errorKeys = Object.keys(errors)
    errorKeys.forEach((key, i) => {
        newObj[camelCase(key)] = removeWords(errors[key][0], ["code", "Uuid", "uuid"])
    })
    return newObj
}

export const selectYear = (min = 1950) => {
    const yearsRange = []
    for (let i = dayDate().year(); i >= min; i--){
        yearsRange.push(i)
    }
    return { yearsRange }
}

export const cleanText = (val?: string | number | null) => {
    return String(val ?? '')
}

export const formatCount = (count: number) => {
    if (count > 1000000000) return `${(count / 1000000).toFixed(3)}B`
    if(count > 1000000) return `${(count/1000000).toFixed(3)}M`
    if(count > 10000) return `${(count/1000).toFixed(2)}K`
    return count
}

export function objValues(obj?: any) {
    return Object.values(obj ?? {}).filter(e => !!e)
}

export function calcFileSize(size: number, dstSize: 'mb' | 'gb', decimal: boolean = false) {
    if (dstSize === 'mb') {
        return `${(Number(size) / (1024*1024)).toFixed(decimal ? 0 : 2)}${allCaps(dstSize)}`
    }
    if (dstSize === 'gb') {
        return `${(Number(size) / (1024*1024*1024)).toFixed(decimal ? 0 : 2)}${allCaps(dstSize)}`
    }
}

export function isCompatibleFile({ file, maxSize, allowedTypes = [] }: { file?: File, maxSize?: number, allowedTypes?: AllFileTypes[] }): [boolean, string] {
    const fileTypes = allowedTypes.length > 0 ? allowedTypes : FILE_TYPES as string[]
    const maxFileSize = maxSize ?? MAX_FILE_SIZE

    if (!file) {
        return [false, 'No file selected']
    } else if (!fileTypes.includes(file?.type)) {
        return [false, 'File type is not allowed']
    } else if (Number(file?.size) > maxFileSize) {
        return [false, `File is too large (Max: ${calcFileSize(maxFileSize, 'mb', true)})`]
    } else {
        return [true, 'File allowed']
    }
}


/* Utility */
export function formatJson(json: string) {
  if (!json) return ""; //no JSON from response
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    // eslint-disable-next-line no-useless-escape
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}



export function filterByKey(arr: any[] = [], key: string, keyValue: string | number) {
    return arr.filter(e => allLower(e[key]) === allLower(keyValue))
}

export function formatPayload(obj: any = {}) {
    const newObj: any = {}
    Object.keys(obj).forEach(x => {
        if ((obj[x] !== undefined) || obj[x] === 0) {
            newObj[x] = obj[x]
        }
    })
    return newObj
}

export function calcAge(date: string) {
    const today = dayDate()
    const birthDate = dayDate(date)
    const diffYears = birthDate.isValid() ? today.diff(birthDate, 'years') : 0
    const diffDays = birthDate.isValid() ? today.diff(birthDate, 'days') : 0
    return {
        years: `${diffYears ?? 'N/A'}`,
        days: `${diffDays ?? 'N/A'}`,
        full: `${diffYears} yrs, ${diffDays % 365} days`,
    }
}

export default function delay(func: Function, ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => {
        func()
        resolve()
    }, ms));
}

export function findByKey(arr: { [k: string]: any }[], key: string, value: string) {
    return arr.find(e => e[key] === value)
}