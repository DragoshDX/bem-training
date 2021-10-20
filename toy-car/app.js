class AmWheel extends HTMLElement {
  constructor() {
    const mutationObserverConfig = {
      attributes: true,
    };

    super();

    const observer = new MutationObserver(this.mutationObserverCallback);
    observer.observe(this, mutationObserverConfig);
  }

  mutationObserverCallback = (mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const mutation = mutationsList[i];
      if (mutation.attributeName === 'data-color') {
        this.style.backgroundColor = this.dataset.color;

        break;
      }
    }
  };

  connectedCallback() {
    const fragment = new DocumentFragment();
    this.wheelCap = document.createElement('div');
    this.wheelCap.classList.add('wheel__cap');
    this.color = this.dataset.color;

    this.style.backgroundColor = this.color;

    fragment.append(this.wheelCap);

    this.append(fragment);
    this.classList.add('wheel');
  }
}

customElements.define('am-wheel', AmWheel);

class AmLight extends HTMLElement {
  static get observedAttributes() {
    return ['on'];
  }

  connectedCallback() {
    const position = this.dataset.position || 'front';
    const positionClass = `light--${position}`;

    this.classList.add('light', positionClass);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'on') {
      if (newValue === 'true') {
        this.classList.add('light--on');
      } else {
        this.classList.remove('light--on');
      }
    }
  }
}

customElements.define('am-light', AmLight);
