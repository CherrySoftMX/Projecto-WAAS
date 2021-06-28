type Pullable = { [key: string]: any };

export class UrlBuilder<T extends Pullable> {
  DEFAULT_URL: string;
  DEFAULT_URL_PARAMS: Pullable;

  url: string;

  constructor(defaultUrl: string, defautlUrlParams: Pullable) {
    this.DEFAULT_URL = defaultUrl;
    this.DEFAULT_URL_PARAMS = defautlUrlParams;
    this.url = this.DEFAULT_URL;
  }

  buildUrl = (args: Partial<T>) => {
    let ob = { ...this.DEFAULT_URL_PARAMS };
    this.url = this.DEFAULT_URL;

    Object.getOwnPropertyNames(args).forEach((name) => {
      ob = { ...ob, [name]: args[name] };
    });

    Object.getOwnPropertyNames(ob).forEach((property) => {
      let value = args[property] || this.DEFAULT_URL_PARAMS[property];

      if (typeof value === 'string') value = value.replace(/\s/g, '%20');

      if (!!value)
        this.url += `&${property}=${
          Array.isArray(value) ? value.join() : value
        }`;
    });

    return this;
  };
}
