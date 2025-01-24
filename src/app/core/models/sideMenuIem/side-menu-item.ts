export class dropDownOptions{
    text?: string;
    link?: string;
  
    constructor({
      text,
      link,
    }: {
      text?: string;
      link?: string;
    } = {}) {
      this.text = text;
      this.link = link;
    }
}

export class SideMenuItem {
    text?: string;
    link?: string;
    isDropDown?: boolean;
    icon?: string;
    isOpen?: boolean;
    options?: dropDownOptions[];
  
    constructor({
      text,
      link,
      isDropDown,
      icon,
      isOpen,
      options,
    }: {
      text?: string;
      link?: string;
      isDropDown?: boolean;
      icon?: string;
      isOpen?: boolean;
      options?: dropDownOptions[];
    } = {}) {
      this.text = text;
      this.link = link;
      this.isDropDown = isDropDown;
      this.icon = icon;
      this.isOpen = isOpen;
      this.options = options;
    }
  }
  