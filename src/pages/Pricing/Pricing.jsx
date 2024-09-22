import { PageNavBar } from "@common/components";

import styles from "../Product/Product.module.css";

import pricingComponentImg from "@assets/product-img.jpg";

export default function Pricing() {
  return (
    <main className={styles.product}>
      <PageNavBar />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img
          src={pricingComponentImg}
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}
