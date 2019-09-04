(() => {
  const blackListKey = 'black-list'
  const aliasListKey = 'alias-list'
  const blackList = JSON.parse(localStorage.getItem(blackListKey))
  const aliasList = JSON.parse(localStorage.getItem(aliasListKey))
  const searchFormElement = document.getElementById('search-form')
  const searchInputElement = document.getElementById('search-input')

  const convertSearchString = inputString => {
    let searchString = inputString
    aliasList.forEach(item => {
      searchString = searchString.replace(item.alias, item.target)
      console.log(searchString, item)
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
    console.log(searchString)
    searchInputElement.value = ''
    console.log(buildURL(searchString))
    window.open(buildURL(searchString), '_blank')
  }

  searchFormElement.addEventListener('submit', handleSearch)
})()
