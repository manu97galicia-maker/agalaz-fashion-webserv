"""
Google Indexing API - Bulk URL Submit
Proyecto: agalaz.com
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
import time

# --- CONFIGURACION ---
JSON_KEY = r"C:\Users\ManuS\Desktop\agalaz fashion\gen-lang-client-0891262124-5e33af9f1eaa.json"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

# Todas las URLs del sitemap de agalaz.com
URLS = [
    "https://agalaz.com",
    "https://agalaz.com/try-on",
    "https://agalaz.com/virtual-try-on",
    "https://agalaz.com/blog",
    "https://agalaz.com/blog/how-to-know-if-clothes-will-fit-without-trying-them-on",
    "https://agalaz.com/blog/why-clothes-look-different-online-vs-in-person",
    "https://agalaz.com/blog/how-to-reduce-online-shopping-returns",
    "https://agalaz.com/blog/best-way-to-try-on-clothes-online-with-ai",
    "https://agalaz.com/blog/how-to-dress-for-your-body-type-without-a-stylist",
    "https://agalaz.com/blog/online-shopping-mistakes-that-lead-to-returns",
    "https://agalaz.com/blog/what-to-wear-to-a-job-interview-2026",
    "https://agalaz.com/blog/best-colors-to-wear-for-your-skin-tone",
    "https://agalaz.com/blog/how-to-style-oversized-clothes-without-looking-sloppy",
    "https://agalaz.com/blog/capsule-wardrobe-guide-30-outfits-15-pieces",
    "https://agalaz.com/blog/barrel-leg-jeans-styling-guide",
    "https://agalaz.com/blog/digital-nomad-corporate-crease-free-office-wear",
    "https://agalaz.com/blog/jellyfish-silhouette-styling-guide",
    "https://agalaz.com/blog/how-to-get-accurate-body-measurements-for-virtual-try-on",
    "https://agalaz.com/blog/best-free-virtual-dressing-room-apps-android-ios-2026",
    "https://agalaz.com/blog/virtual-try-on-office-siren-aesthetic-glasses",
    "https://agalaz.com/blog/best-glasses-colors-deep-autumn-skin-tone",
    "https://agalaz.com/blog/free-ai-glasses-stylist-diamond-face-shape",
    "https://agalaz.com/blog/virtual-try-on-glasses-hide-dark-circles",
    "https://agalaz.com/blog/coquette-aesthetic-spring-nails-virtual-try-on",
    "https://agalaz.com/blog/short-almond-spring-nails-clean-girl-look",
    "https://agalaz.com/blog/pastel-chrome-nails-2026-futuristic-spring-trend",
    "https://agalaz.com/blog/spring-wedding-guest-mother-of-groom-dresses-2026",
    "https://agalaz.com/blog/ai-clothes-changer-online-free-trial",
    "https://agalaz.com/blog/como-reducir-devoluciones-tienda-ropa-online",
    "https://agalaz.com/blog/virtual-dressing-room-online-free",
    "https://agalaz.com/blog/1-5-carat-vs-2-carat-diamond-on-hand",
    "https://agalaz.com/blog/diamond-carat-size-on-hand-simulator",
    "https://agalaz.com/virtual-tattoo-simulator",
    "https://agalaz.com/realistic-swimwear-try-on",
    "https://agalaz.com/privacy",
    "https://agalaz.com/terms",
]

def main():
    credentials = service_account.Credentials.from_service_account_file(
        JSON_KEY, scopes=SCOPES
    )
    service = build("indexing", "v3", credentials=credentials)

    ok, fail = 0, 0
    for i, url in enumerate(URLS, 1):
        body = {"url": url, "type": "URL_UPDATED"}
        try:
            response = service.urlNotifications().publish(body=body).execute()
            print(f"[{i}/{len(URLS)}] OK {url}")
            ok += 1
        except Exception as e:
            print(f"[{i}/{len(URLS)}] ERROR {url} -> {e}")
            fail += 1
        time.sleep(1)

    print(f"\n{'='*50}")
    print(f"RESULTADO: {ok} enviadas OK / {fail} errores / {len(URLS)} total")

if __name__ == "__main__":
    main()
