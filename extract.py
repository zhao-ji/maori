from pprint import pprint

from requests import get
from bs4 import BeautifulSoup


def fetch_maori_translation(text):
    ret = get(
        "https://maoridictionary.co.nz/search",
        params={
            "keywords": text,
        },
    )
    result = []
    if ret.ok:
        parsed_html = BeautifulSoup(ret.content, features="html.parser")
        all_sections = parsed_html.find_all('section', attrs={"class": None})
        for section in all_sections:
            section_result = []
            instances = section.find_all(class_="center")
            for instance in instances:
                instance_result = {}

                title = instance.find(class_="title")
                if title:
                    lookup = title.find(text=True, recursive=False)
                    if lookup == "Found 0 matches":
                        return []
                    instance_result["lookup"] = "".join(lookup.split("\n")).strip()
                    audio = title.find("audio")
                    if audio:
                        instance_result["audio_href"] = audio["src"]

                detail = instance.find(class_="detail")
                if detail:
                    translation = detail.find("p").get_text(" ", strip=True)
                    translation = " ".join(translation.split("\n"))
                    instance_result["translation"] = translation

                section_result.append(instance_result)
            result.append(section_result)

    return result


if __name__ == "__main__":
    pprint(fetch_maori_translation("code"))
