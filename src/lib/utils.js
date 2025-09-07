export function classNames(...a){
    return a.filter(Boolean).join(' ')
  }
  
  export function downloadFile(filename, content, type = 'text/plain;charset=utf-8'){
    const blob = new Blob([content], { type })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
  