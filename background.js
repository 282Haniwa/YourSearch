const blackListKey = 'black-list'
const aliasListKey = 'alias-list'
const blackList = JSON.parse(localStorage.getItem(blackListKey))
const aliasList = JSON.parse(localStorage.getItem(aliasListKey))
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
  const encodedSearchString = encodeURIComponent(searchString)
  return `${baseURI}?q=${encodedSearchString}&oq=${encodedSearchString}&ie=UTF-8`
}

chrome.omnibox.onInputEntered.addListener(text => {
  var newURL = buildURL(convertSearchString(text))
  chrome.tabs.create({ url: newURL })
})
