export class MenuItem {
  public parent: MenuItem;

  constructor(public title: string, public link: string, public children: MenuItem[] = [], public clickHandler: Function = null) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].parent = this;
    }
  }
}
