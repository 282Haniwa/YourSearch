(() => {
  const blackListKey = 'black-list'
  const aliasListKey = 'alias-list'
  const blackList = JSON.parse(localStorage.getItem(blackListKey))
  const aliasList = JSON.parse(localStorage.getItem(aliasListKey))
  const searchFormElement = document.getElementById('search-form')
  const searchInputElement = document.getElementById('search-input')
  const optionButton = document.getElementById('go-to-options')

  const convertSearchString = inputString => {
    let searchString = inputString
    aliasList.forEach(item => {
      searchString = searchString.replace(item.alias, item.target)
    })
    blackList.forEach(item => {
      searchString = `${searchString} -${item}`
    })
    return searchString
  }

  const buildURL = searchString => {
    const baseURI = 'https://www.google.com/search'
    const encodedSearchString = searchString.replace(' ', '+')
    return `${baseURI}?q=${encodedSearchString}&oq=${encodedSearchString}&ie=UTF-8`
  }

  const handleSearch = event => {
    event.preventDefault()
    const searchString = convertSearchString(searchInputElement.value)
    searchInputElement.value = ''
    window.open(buildURL(searchString), '_blank')
  }

  const handleClickOptionButton = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  searchFormElement.addEventListener('submit', handleSearch)
  optionButton.addEventListener('click', handleClickOptionButton)
})()
