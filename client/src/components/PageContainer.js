import React from 'react'
import { Page, Layout } from '@shopify/polaris';

function PageContainer({ title, children }) {
  return (
    <Page title={title}>
      <Layout>
        { children }
      </Layout>
    </Page>
  );
}

export default PageContainer;
