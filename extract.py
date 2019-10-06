from requests import get
from BeautifulSoup import BeautifulSoup


if __name__ == "__main__":
    ret = get(
        "https://maoridictionary.co.nz/search",
        params={
            "keywords": "kia ora",
        },
    )
    if ret.ok:
        print ret.status_code
        parsed_html = BeautifulSoup(ret.content)
        all_sections = parsed_html.find_all('section')
        # print ret.content
