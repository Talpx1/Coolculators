export default function useFlagEmoji() {
    function getEmojiFromCountryCode(countryCode: string): string {
        return countryCode
            .toUpperCase()
            .split('')
            .map((char) => String.fromCodePoint(char.charCodeAt(0) + 0x1f1a5))
            .join('')
    }

    return { fromCode: getEmojiFromCountryCode }
}
