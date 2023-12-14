const formattedPageObject = (page) => ({
  id: page._id,
  title: page.title,
  pageChildren: page.pageChildren,
  isFavPage: page.isFavPage,
  createdAt: page.createdAt,
})

export default formattedPageObject;