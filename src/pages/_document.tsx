import Document from "next/document";
import { createGetInitialProps } from "@mantine/next";

class MyDocument extends Document {
  static override getInitialProps = createGetInitialProps();
}

export default MyDocument;
