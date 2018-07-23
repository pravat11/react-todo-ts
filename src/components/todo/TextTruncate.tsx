import * as React from 'react';

interface Props {
  text?: string;
  line?: number;
  truncateText?: string;
  textTruncateChild?: any;
}

export default class TextTruncate extends React.Component<Props, {}> {
  static defaultProps = {
    line: 1,
    text: '',
    truncateText: '…'
  };

  scope: any;
  canvas: any;
  rafId: any;

  componentDidMount() {
    const canvas = document.createElement('canvas');
    const docFragment = document.createDocumentFragment();
    const style = window.getComputedStyle(this.scope);
    const font = [style['font-weight'], style['font-style'], style['font-size'], style['font-family']].join(' ');

    docFragment.appendChild(canvas);
    this.canvas = canvas.getContext('2d');
    this.canvas.font = font;
    this.forceUpdate();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  onResize = () => {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
    this.rafId = window.requestAnimationFrame(this.update.bind(this));
  };

  update = () => {
    const style = window.getComputedStyle(this.scope);
    const font = [
      style['font-weight'],
      style['font-style'],
      style['font-size'],
      style['font-family'],
      style['letter-spacing']
    ].join(' ');
    this.canvas.font = font;
    this.forceUpdate();
  };

  measureWidth(text: string) {
    return Math.ceil(this.canvas.measureText(text).width);
  }

  getRenderText() {
    const { line, text, textTruncateChild, truncateText, ...props } = this.props;

    const scopeWidth = this.scope.getBoundingClientRect().width;

    // return if display:none
    if (scopeWidth === 0) {
      return null;
    }

    // return if all of text can be displayed
    if (scopeWidth >= this.measureWidth(text || '')) {
      return React.createElement('span', props, text);
    }

    let childText = '';
    if (textTruncateChild && typeof textTruncateChild.type === 'string') {
      const type = textTruncateChild.type;
      if (type.indexOf('span') >= 0 || type.indexOf('a') >= 0) {
        childText = textTruncateChild.props.children;
      }
    }

    let currentPos = 1;
    const maxTextLength = (text || '').length;
    let truncatedText = '';
    let splitPos = 0;
    let startPos = 0;
    const displayLine = line;
    let width = 0;
    let lastIsEng = false;
    let isPrevLineWithoutSpace = false;
    let lastPos = 0;
    let lastSpaceIndex = -1;
    let ext = '';
    let loopCnt = 0;

    while ((displayLine as number)-- > 0) {
      ext = displayLine ? '' : truncateText + (childText ? ' ' + childText : '');
      while (currentPos <= maxTextLength) {
        truncatedText = (text || '').substr(startPos, currentPos);
        width = this.measureWidth(truncatedText + ext);
        if (width < scopeWidth) {
          splitPos = (text || '').indexOf(' ', currentPos + 1);
          if (splitPos === -1) {
            currentPos += 1;
            lastIsEng = false;
          } else {
            lastIsEng = true;
            currentPos = splitPos;
          }
        } else {
          do {
            if (loopCnt++ >= 5) {
              break;
            }
            truncatedText = (text || '').substr(startPos, currentPos);
            if (!displayLine) {
              currentPos--;
            }
            if (truncatedText[truncatedText.length - 1] === ' ') {
              truncatedText = (text || '').substr(startPos, currentPos - 1);
            }
            if (lastIsEng) {
              lastSpaceIndex = truncatedText.lastIndexOf(' ');
              if (lastSpaceIndex > -1) {
                currentPos = lastSpaceIndex;
                if (displayLine) {
                  currentPos++;
                }
                truncatedText = (text || '').substr(startPos, currentPos);
              } else {
                currentPos--;
                truncatedText = (text || '').substr(startPos, currentPos);
              }
            } else {
              currentPos--;
              truncatedText = (text || '').substr(startPos, currentPos);
            }
            width = this.measureWidth(truncatedText + ext);
          } while (width >= scopeWidth && truncatedText.length > 0);
          startPos += currentPos;
          break;
        }
      }

      if (currentPos >= maxTextLength) {
        startPos = maxTextLength;
        break;
      }

      if (lastIsEng && !isPrevLineWithoutSpace && (text || '').substr(lastPos, currentPos).indexOf(' ') === -1) {
        isPrevLineWithoutSpace = (text || '').substr(lastPos, currentPos).indexOf(' ') === -1;
        (displayLine as number)--;
      }
      lastPos = currentPos + 1;
    }

    if (startPos === maxTextLength) {
      return React.createElement('span', props, text);
    }

    return (
      <div {...props}>
        {React.createElement('span', props, (text || '').substr(0, startPos) + truncateText + ' ')}
        {textTruncateChild}
      </div>
    );
  }

  render() {
    const { text, line, truncateText, textTruncateChild, ...props } = this.props;
    const renderText = this.scope && line ? this.getRenderText() : React.createElement('span', props, text);
    const rootProps = {
      ref: (el: any) => {
        this.scope = el;
      },
      style: { overflow: 'hidden' }
    };

    return React.createElement('div', rootProps, renderText);
  }
}
