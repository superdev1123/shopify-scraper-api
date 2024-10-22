export interface FontStyle {
    family: string;
    variants: string;
    url?: string;
}

export interface ButtonStyle {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    textTransform: string;
    textDecoration: string;
    textAlign: string;
    backgroundColor: string;
    color: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
}

export interface ScrapeResult {
    fonts: FontStyle[];
    primaryButton: ButtonStyle | null;
}