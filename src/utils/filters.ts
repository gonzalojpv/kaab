const filters = {
  formatMoney(val: number, n: number, x: number) {
    if (val % 1 !== 0 && n < 2) {
      n = 2
    }
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')'
    return parseFloat(`${val}`)
      .toFixed(Math.max(0, ~~n))
      .replace(new RegExp(re, 'g'), '$&,')
  }
}

export default filters
