import urllib.request
import urllib.parse
import json
import time
import os
import re

citations = [
    "Alexander, C. (1965). A city is not a tree. Architectural Forum",
    "Bolund, P., & Hunhammar, S. (1999). Ecosystem services in urban areas. Ecological Economics, 29, 293-301.",
    "Campbell, L. K., Svendsen, E. S., Johnson, M. L., & Plitt, S. (2022). Not by trees alone: Centering community in urban forestry. Landscape and Urban Planning, 224, 104445.",
    "Dobbs, C., Escobedo, F. J., & Zipperer, W. C. (2011). A framework for developing urban forest ecosystem services and goods indicators. Landscape and Urban Planning, 99, 196-206.",
    "Dwyer, J. F., McPherson, E. G., Schroeder, H. W., & Rowntree, R. A. (1992). Assessing the benefits and costs of the urban forest. Journal of Arboriculture, 18(5), 227-234.",
    "Escobedo, F. J., Kroeger, T., & Wagner, J. E. (2011). Urban forests and pollution mitigation: analyzing ecosystem services and disservices. Environmental Pollution, 159(8-9), 2078-2087.",
    "Groninger, J. W., Close, D. D., & Basman, C. M. (2002). Can small, rural communities practice urban forestry?",
    "Hargrave, J. R., Harper, R. W., Butler, B. J., & Mullins, J. T. (2022). Municipal Forest Program Management in the United States of America: A Systematic Review. Forests, 14(35).",
    "Lin, J., Kroll, C. N., Nowak, D. J., & Greenfield, E. J. (2019). A review of urban forest modeling: implications for management and future research.",
    "Livesley, S. J., McPherson, E. G., & Calfapietra, C. (2016). The Urban Forest and Ecosystem Services: Impacts on Urban Water, Heat, and Pollution Cycles at the Tree, Street, and City Scale. Journal of Environmental Quality, 45, 119-124.",
    "McPherson, E. G., Xiao, Q., Maco, S. E., VanDerZanden, A. M., Simpson, J. R., Bell, N., & Peper, P. J. (2002). Western Washington and Oregon Community Tree Guide: Benefits, Costs and Strategic Planting. Center for Urban Forest Research, USDA Forest Service.",
    "National Research Council. (2013). Urban Forestry: Toward an Ecosystem Services Research Agenda: A Workshop Summary.",
    "Nowak, D. J. Urban Forest Sustainability in the United States.",
    "Nowak, D. J. (2020). Understanding i-Tree: Summary of programs and methods (General Technical Report NRS-200, Appendix 14). USDA Forest Service, Northern Research Station.",
    "Qi, Y., & Zhang, Z. (2003). Introduction to Urban and Community Forestry in the United States of America: History, Accomplishments, Issues and Trends. Forestry Studies in China, 5(4), 54-61.",
    "Romolini, M., Moran, C., Strauss, E., Fimiani, L., & Sarain, A. L. (2019). CITY OF COMMERCE TREE CANOPY PRIORITIZATION Final Report. Loyola Marymount University Center for Urban Resilience & TreePeople.",
    "Schoeneman, R. S. (1994). Urban forestry: Managing the forests where we live.",
    "US Environmental Protection Agency. Benefits of Trees and Vegetation.",
    "Vogt, J. (2024). A Comprehensive Framework for Understanding Urban Forests as Social-Ecological Systems. Arboriculture & Urban Forestry, 50(6), 427-469.",
    "Wolf, K. L. (2010). Human Health & Well-Being: Evidence for an Expanded Framework of Ecosystem Services in Cities. Cities and the Environment (CATE), 3(1), Article 24.",
    "World Forestry Center. (1993). A Technical Guide to Urban and Community Forestry. Nebraska Forest Service."
]

def search_openalex(query):
    # Use the first 80 characters of the query for a better search hit
    clean_query = re.sub(r'[^\w\s]', ' ', query)
    search_str = urllib.parse.quote(clean_query[:80])
    url = f"https://api.openalex.org/works?search={search_str}&mailto=assistant@example.com"
    req = urllib.request.Request(url, headers={'User-Agent': 'Python script'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            if data['results']:
                return data['results'][0]
    except Exception as e:
        print(f"Error querying OpenAlex: {e}")
    return None

def main():
    downloaded_dir = os.path.dirname(os.path.abspath(__file__))
    report = []
    
    print("Starting OpenAlex literature search and download...")
    for cit in citations:
        print(f"\nSearching for: {cit[:60]}...")
        work = search_openalex(cit)
        
        if work:
            title = work.get('title', 'Unknown Title')
            if not title:
                title = 'Unknown Title'
            oa_url = work.get('open_access', {}).get('oa_url')
            
            # Create a safe filename
            safe_title = re.sub(r'[^\w\-]', '_', title)[:50]
            year = work.get('publication_year', 'Year')
            filename = f"{year}_{safe_title}.pdf"
            filepath = os.path.join(downloaded_dir, filename)
            
            if oa_url and oa_url.endswith('.pdf'):
                print(f"Found Open Access PDF: {oa_url}")
                try:
                    req = urllib.request.Request(oa_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=15) as response:
                        with open(filepath, 'wb') as f:
                            f.write(response.read())
                    print(f"SUCCESS: Downloaded to {filename}")
                    report.append(f"[SUCCESS] {title} - Downloaded as {filename}")
                except Exception as e:
                    print(f"FAILED: Could not download PDF. ({e})")
                    report.append(f"[FAILED DOWNLOAD] {title} - URL: {oa_url}")
            else:
                doi = work.get('doi')
                print(f"No direct PDF found. DOI: {doi}")
                report.append(f"[NO OPEN ACCESS PDF] {title} - DOI: {doi}")
        else:
            print("FAILED: Could not find paper in OpenAlex.")
            report.append(f"[NOT FOUND] {cit}")
        
        time.sleep(1) # Be nice to the API
        
    report_path = os.path.join(downloaded_dir, "download_report.txt")
    with open(report_path, "w") as f:
        f.write("\n".join(report))
    print(f"\nProcess complete. Check {report_path} for details.")

if __name__ == "__main__":
    main()
