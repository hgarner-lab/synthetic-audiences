# The 24 KSA people: names for review

These are the synthetic people for the Saudi Arabia (KSA) version of the room. They
replace the names in the persona cards (`data/source`), which paired every checker and
spreader with a man and every gatekeeper and reshaper with a woman. No Saudi colleague has
reviewed this list yet. It was built from published guidance and checked against public
records, and should be reviewed by someone from the Kingdom before it goes in front of
clients.

## How the list was built

- **Balance.** 12 women and 12 men. Every role (checkers, gatekeepers, spreaders,
  reshapers) has 3 of each, and every group has 2 of each, so gender never lines up with
  role or group. This is a design choice for the prototype. Saudi women's share of the
  workforce is about 36%, and their share of senior roles is growing but lower, so a
  real room of this seniority would usually have fewer women.
- **Plausible roles for women.** Each woman's job is one Saudi women hold today:
  engineering and business development in energy, general counsel and investment roles in
  finance, director roles in government, cybersecurity and data in technology, and
  editorial leadership in media.
- **Name format.** Given name then family name, as Saudis usually give their name in
  business ("Noura Al-Dosari"). The full formal name adds the father's and grandfather's
  names, which the room doesn't need. Women keep their own family name after marriage.
- **Family names.** Drawn from large, widely shared tribal and family names across the
  Kingdom: Najd, the Hijaz, the south, the north and the Eastern Province. Each is used
  once.
- **Names avoided.**
  - The royal family (Al Saud) and closely linked families (Al-Sudairi).
  - The religious Al ash-Sheikh family, which the cards' "Al-Shaikh" echoes.
  - Well-known business and official families (Al-Rajhi, Olayan, Al-Tuwaijri).
  - Surnames more typical of other Gulf states (Al-Farsi, Al-Marri, Al-Sayegh), which were
    in the cards.
  - Any name matching a well-known public figure. Three first choices matched Saudi
    footballers and were changed.
  - Names that echo people linked to terrorism. "Nawaf" and "Ziyad" with "Al-Hazmi" recall
    two 9/11 hijackers, so neither combination is used.
- **Given names.** Common for people born roughly 1965–1990, clearly male or female, with
  no repeats. Younger names (Rawan, Rakan) go to the younger people.
- **Two expatriates.** Expatriates hold most private-sector jobs in the Kingdom, so the
  private-sector groups include one Lebanese finance partner and one Indian technology
  director. Government roles are all Saudi nationals.
- **Ages** run from 35 to 60, with grey or greying hair on faces for people 50 and over.

## The list

| Group | Role | Type | Name | Arabic | Gender | Age |
| --- | --- | --- | --- | --- | --- | --- |
| Energy | Chief Engineer, Upstream Operations | Checker | Adel Al-Harbi | عادل الحربي | Man | 50–60 |
| Energy | Director, Vendor Compliance and Local Content | Gatekeeper | Noura Al-Dosari | نورة الدوسري | Woman | 40–50 |
| Energy | Vice President, Business Development | Spreader | Reem Al-Hamdan | ريم الحمدان | Woman | 38–48 |
| Energy | Director, Downstream Integration Strategy | Reshaper | Sultan Al-Mulhim | سلطان الملحم | Man | 45–55 |
| Chemicals | Director, Process Safety and Reliability | Checker | Hanan Al-Ghamdi | حنان الغامدي | Woman | 40–50 |
| Chemicals | Head of ESG and Regulatory Affairs | Gatekeeper | Majed Al-Anazi | ماجد العنزي | Man | 45–55 |
| Chemicals | Director, Supply Chain Development | Spreader | Yousef Al-Shahrani | يوسف الشهراني | Man | 40–50 |
| Chemicals | Director, Corporate Investment Planning | Reshaper | Lama Al-Otaibi | لمى العتيبي | Woman | 40–50 |
| Finance & legal | Managing Director, Energy and Infrastructure Finance | Checker | Hisham Al-Qahtani | هشام القحطاني | Man | 45–55 |
| Finance & legal | General Counsel | Gatekeeper | Ghada Al-Zahrani | غادة الزهراني | Woman | 45–55 |
| Finance & legal | Partner, Projects and Infrastructure Finance | Spreader | Karim Haddad (Lebanese) | كريم حداد | Man | 45–55 |
| Finance & legal | Chief Investment Strategist | Reshaper | Maha Al-Sulaiman | مها السليمان | Woman | 40–50 |
| Government | Director, Industrial Programs | Checker | Amal Al-Juhani | أمل الجهني | Woman | 40–50 |
| Government | Director, Regulatory Licensing | Gatekeeper | Meshal Al-Mutairi | مشعل المطيري | Man | 45–55 |
| Government | Director, Investor Services | Spreader | Hessa Al-Asmari | حصة الأسمري | Woman | 38–48 |
| Government | Director, Community and Workforce Development | Reshaper | Ibrahim Al-Balawi | إبراهيم البلوي | Man | 50–60 |
| Technology | Head of Industrial Digitalization | Checker | Rakan Al-Shammari | راكان الشمري | Man | 38–48 |
| Technology | Director, Cybersecurity and Data Governance | Gatekeeper | Rawan Al-Harthi | روان الحارثي | Woman | 35–45 |
| Technology | Director, Technology Partnerships | Spreader | Priya Raman (Indian) | بريا رامان | Woman | 38–48 |
| Technology | Chief Digital Officer | Reshaper | Mazen Al-Malki | مازن المالكي | Man | 40–50 |
| Media & commentary | Editorial Director, Energy and Markets | Checker | Nouf Al-Ruwaili | نوف الرويلي | Woman | 40–50 |
| Media & commentary | Director, Gulf Political Risk | Gatekeeper | Hamad Al-Yami | حمد اليامي | Man | 45–55 |
| Media & commentary | Senior Columnist, Industrial Transformation | Spreader | Abdullah Al-Maghrabi | عبدالله المغربي | Man | 45–55 |
| Media & commentary | Director, Regional Development Commentary | Reshaper | Samar Al-Faraj | سمر الفرج | Woman | 40–50 |

Role titles and person IDs (`SA_EN_V` and so on) are unchanged from the cards.

## Faces

The faces use the same illustration style as the China room, with extra layers drawn in
the same line weight: head coverings, short beards, fine age lines and a hint of collar
(`components/faceLayers.ts`). Each person's look is set in `data/ksaPeople.ts`.

- **Dress follows the setting.** Senior people in companies (energy, chemicals, finance,
  technology) wear suits or business wear with no head covering, as Aramco's leadership
  team does. The two men in government wear the thobe with a ghutra or shemagh, which is
  required at work. The two women in government wear an abaya with a looser scarf. Media
  is a mix: one columnist in a ghutra, one editor in a looser scarf, two in business dress.
- **Looser scarves** sit a little back from the forehead and show the front of the hair.
- **Age.** Fine lines from 45, more from 55. Hair and beards go grey from 50, lighter
  grey from 55.
- **Beards.** Short and neat, on 11 of the 12 men.

## Questions for reviewers

1. Does each name sound natural for a Saudi senior professional of that age?
2. Do any family names carry associations we've missed: a prominent family, a sect or a
   region that would read oddly for the role?
3. Is it right to include two expatriates, and are their roles plausible?
4. Is the Arabic spelling correct for each name?
5. Do the faces, dress and head coverings look right for each role?

## Sources used

- [Labour force participation rate of Saudi females reaches 36.2%](https://www.stats.gov.sa/en/w/news/6), General Authority for Statistics
- [Saudi Arabia Naming Customs](https://www.familysearch.org/en/wiki/Saudi_Arabia_Naming_Customs), FamilySearch
- [Hessa (name)](https://en.wikipedia.org/wiki/Hessa_(name)), Wikipedia
- [Women leaders in the Gulf: the view from Saudi Aramco](https://www.mckinsey.com/featured-insights/leadership/women-leaders-in-the-gulf-the-view-from-saudi-aramco), McKinsey
- [Women seek a bigger role in the Arab Gulf's energy sector](https://www.atlanticcouncil.org/blogs/new-atlanticist/women-seek-a-bigger-role-in-arab-gulf-s-energy-sector/), Atlantic Council
- [Women in the Saudi workforce](https://agsi.org/analysis/saudi-women-in-the-workforce/), Arab Gulf States Institute
- [Saudi Arabia expands Saudization rates in 2025](https://www.middleeastbriefing.com/news/saudi-arabia-expands-saudization-requirements-in-key-professions-2025-compliance/), Middle East Briefing
- Public-figure checks: Wikipedia pages for [Fahad Al-Harbi](https://en.wikipedia.org/wiki/Fahad_Al-Harbi), [Abdulrahman Al-Qahtani](https://en.wikipedia.org/wiki/Abdulrahman_Al-Qahtani) and [Turki Al-Mutairi](https://en.wikipedia.org/wiki/Turki_Al-Mutairi), all footballers, so those names were changed.
