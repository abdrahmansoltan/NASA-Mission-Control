import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return (
    <ArwesFooter animate>
      <Centered>
        <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
          Created By:
          <a
            style={{
              color: "inherit",
              marginLeft: "5px",
            }}
            href="https://www.abdelrahmansoltan.me/"
            target="blank"
          >
            Abdelrahman Soltan
          </a>
          .
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

export default Footer;
