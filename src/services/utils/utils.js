export const goToExternalPage = (page, newTab) => {
    if (!page.match(/^[a-zA-Z]+:\/\//))
        page = 'http://' + page;
    if (newTab)
        window.open(page)
    else
        document.location.href = page
    return false
}