/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
// import Media from "react-media"
// import Helmet from "react-helmet"
// import Sidebar from "./sidebar"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>

        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: "0 auto",
            maxWidth: 980,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "100%"
          }}
        >
     
          <div
            style={{
              margin: "0 auto",
              maxWidth: 980,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "100%",
              padding: "25px"
            }}
          >
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </div>
        </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout 
