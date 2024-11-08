import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const defaultBreadCrumb = Component.Breadcrumbs({
  rootName: "home",
  showCurrentPage: false,
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/xidsyed",
      "Linkedin": "https://www.linkedin.com/in/syedmohsin01/",
      "Twitter": "https://x.com/syedinator",
      "Resume": "https://acqcc.blog/thoughts/resume"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    defaultBreadCrumb,
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.SearchAndDarkmode(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph(),
    Component.Backlinks()
  ],
  afterBody: [],
}

const recentPosts = Component.RecentNotes({
  title: "Recently Posted",
  limit: 4,
  linkToMore: "posts/" as SimpleSlug,
  filter: (f) =>
    f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
  showTags: false
})
const indexExplorer = Component.Explorer({filterFn: (node) => ["peek", "tags"].indexOf(node.name) == -1, useSavedState: false})
// custom layout for the front page
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.PageTitle(),
    Component.SearchAndDarkmode(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(indexExplorer),
  ],
  afterBody: [
    recentPosts,
  ],
  right: [
    Component.Graph(),
    Component.MobileOnly(indexExplorer),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [defaultBreadCrumb, Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.SearchAndDarkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  afterBody: [],
  right: [],
}
