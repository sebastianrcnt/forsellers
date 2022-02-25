import axios from "axios";
import jsdom, { JSDOM } from "jsdom";
// import events from "events";
import EventEmitter from "events";

interface ICoupangProduct {
  vendorItemId: string;
}

class CoupangCrawler {
  private async getProductsInPage(
    query: string,
    page: number
  ): Promise<ICoupangProduct[]> {
    const response = await axios.get("https://www.coupang.com/np/search", {
      params: { channel: "user", q: query, page: 1 },
    });

    const html: string = response.data;
    const dom: JSDOM = new jsdom.JSDOM(html);
    const document: Document = dom.window.document;

    const elements: NodeListOf<Element> = document.querySelectorAll(
      "#productList > .search-product"
    );

    const products: ICoupangProduct[] = [];

    for (let i = 0; i < elements.length; i++) {
      const element: Element = elements[i];
      const vendorItemId = element.getAttribute("data-vendor-item-id");
      if (!vendorItemId) continue;
      const product: ICoupangProduct = {
        vendorItemId,
      };
      products.push(product);
    }

    return products;
  }

  public async getProductRank(
    query: string,
    productUrl: string, // string that contains product's vendor item id
    eventTracker?: EventEmitter
  ) {
    this.getProductsInPage(query, 1);
  }
}
