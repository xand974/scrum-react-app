import { SendOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Layout from "../../components/layout/Layout";
import { createReview, getSprint } from "../../context/apiCalls";
import "./review.scss";

export default function Review() {
  const [review, setReview] = useState("");
  const location = useLocation();
  const { sprint } = useSelector((state) => state.sprints);
  const SPRINT_ID = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    getSprint(dispatch, SPRINT_ID);
  }, [dispatch, SPRINT_ID]);

  const handleCreate = () => {
    createReview(review, SPRINT_ID);
  };

  return (
    <Layout>
      <div className="review">
        {sprint.review ? (
          <div className="review-display">
            {sprint.review}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
              atque eveniet debitis deserunt eligendi molestiae natus voluptatum
              explicabo alias, totam at expedita impedit, eius quam minus
              tempora nihil excepturi animi omnis ut similique cupiditate
              tenetur cum? Mollitia sint tenetur consequatur sunt nemo sed nam
              inventore ea neque aperiam quos dignissimos, ducimus, eum
              consequuntur quas laudantium quasi excepturi? Dolorem eos in nam,
              aut voluptates deserunt. Velit recusandae, iure blanditiis,
              similique laudantium consequuntur odit sit nesciunt enim
              necessitatibus distinctio earum dolorum laboriosam quia error vel
              perferendis exercitationem rerum officiis explicabo sunt quidem
              voluptatem. Nemo at ratione dicta repellendus, tempore similique
              qui accusamus voluptatem, non labore consectetur. Reprehenderit
              consectetur officia eaque doloribus illum minima mollitia magnam
              itaque praesentium perspiciatis sequi, dolorum pariatur nam
              tenetur repudiandae, magni inventore dicta? Similique, odit et?
              Blanditiis soluta eius animi nostrum nulla, voluptatum ab beatae
              molestiae adipisci labore officia. Blanditiis porro voluptatum
              cupiditate ut tempora! Inventore magni qui, alias assumenda
              accusantium recusandae necessitatibus impedit animi quisquam
              beatae, suscipit nisi nihil quo delectus ad dolores quasi
              distinctio illum quod aliquam dignissimos. Sint facere in totam
              quo aspernatur fuga deleniti magni! Blanditiis in dignissimos at
              explicabo excepturi, molestias ex recusandae quas culpa, vitae
              debitis rerum! Voluptatibus laudantium nesciunt voluptas nihil.
              Repudiandae officiis quasi soluta quidem impedit dolorem non
              mollitia eveniet cupiditate blanditiis assumenda facere voluptatem
              atque dolores quas incidunt voluptate veniam error sequi, optio
              voluptatibus itaque laborum. Fugiat nulla facere dolor! Ducimus
              ipsam laborum blanditiis incidunt corporis at natus voluptatibus
              dignissimos. In sint facere itaque animi magnam tenetur porro
              voluptatibus repellendus ut neque reiciendis modi dicta tempore,
              nulla cum pariatur minima praesentium. Temporibus iure iusto
              repudiandae cumque tempora dolorem, earum sit in nesciunt est
              pariatur accusamus consequatur illum distinctio rem, quibusdam id?
              Adipisci voluptate tempore velit repellat incidunt corporis
              quidem, dolore optio deserunt officiis odio? Aliquid soluta
              quibusdam dolore repellat hic harum at impedit mollitia porro enim
              odit distinctio iusto quo fuga veritatis, nemo totam dolor et
              vitae neque? Inventore sequi soluta id explicabo, sapiente
              deserunt fugit ducimus incidunt, expedita tempore maiores iste
              magni enim atque amet, laborum voluptatem! Neque, voluptatem non
              numquam commodi eos repellat cumque explicabo iste libero
              expedita? Tempora id vel porro nam, explicabo aperiam quam.
              Voluptate maiores debitis quibusdam animi non tempora hic ipsa
              cumque accusantium itaque. Ad consequatur dolorum alias,
              reiciendis, voluptatum natus fugiat numquam et atque incidunt at
              ipsa perferendis assumenda eum minus hic cupiditate quae non rem
              officiis veniam quas impedit, magnam illum.
            </p>
          </div>
        ) : (
          <form className="review-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="review" className="review-label">
              Review pour <strong>Product Detailed</strong>
            </label>
            <textarea
              name="review"
              id="review"
              className="review-text-area"
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button className="review-btn" onClick={handleCreate}>
              <SendOutlined />
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
