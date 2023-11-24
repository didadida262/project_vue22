export const hex2Rgb = (hex) => { // 十六进制转为RGB
    var rgb = []; // 定义rgb数组
    if (/^\#[0-9A-F]{3}$/i.test(hex)) { // 判断传入是否为#三位十六进制数
      let sixHex = '#';
      hex.replace(/[0-9A-F]/ig, function(kw) {
        sixHex += kw + kw; // 把三位16进制数转化为六位
      });
      hex = sixHex; // 保存回hex
    }
    if (/^#[0-9A-F]{6}$/i.test(hex)) { // 判断传入是否为#六位十六进制数
      hex.replace(/[0-9A-F]{2}/ig, function(kw) {
        rgb.push(eval('0x' + kw)); // 十六进制转化为十进制并存如数组
      });
      return `rgba(${rgb.join(',')}, .3)`; // 输出RGB格式颜色
    } else {
      console.log(`Input ${hex} is wrong!`);
      return 'rgba(0,0,0, .3)';
    }
  }

  export const color16 = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  }
