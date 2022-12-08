import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
      max-width: 400px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
    @media screen and (max-width: 1023.98px) {
      .banner {
        flex-direction: column;
        min-height: unset;
        &-heading {
          font-size: 30px;
          margin-bottom: 10px;
        }
        &-desc {
          font-size: 14px;
          margin-bottom: 20px;
        }
        &-image {
          margin-top: 25px;
        }
        &-button {
          font-size: 14px;
          height: auto;
          padding: 15px;
        }
      }
    }
  }
`;

const HomeBanner = () => {
  return (
    <div>
      <HomeBannerStyles>
        <div className="container">
          <div className="banner">
            <div className="banner-content">
              <h1 className="banner-heading">Monkey Blogging</h1>
              <p className="banner-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                voluptates totam provident ex doloremque numquam nam ullam fugit
                reprehenderit, tempora aliquam fugiat quis, harum ea temporibus
                error accusantium autem. Quibusdam.
              </p>
              <Button kind="secondary" to="/sign-up" className="banner-button">
                Get started
              </Button>
            </div>
            <div className="banner-img">
              <img src="/img-banner.png" alt="banner" />
            </div>
          </div>
        </div>
      </HomeBannerStyles>
    </div>
  );
};

export default HomeBanner;
