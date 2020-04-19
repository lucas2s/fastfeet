import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .navbar {
    max-width: 1285px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu {
    display: none;
  }

  .open {
    display: none;
  }

  @media (max-width: 740px) {
    justify-content: space-between;

    .navbar {
      display: none;
    }

    .menu {
      display: flex;
      border: 0;
      background: #fff;
      padding: 0;
      margin-right: 20px;
      z-index: 2;
    }
  }

  .open {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 1;
  }

  .open nav {
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 10px;
    padding-left: 20px;
  }

  .open ul {
    display: flex;
    flex-direction: column;
  }

  .open aside {
    padding-left: 20px;
  }

  nav {
    display: flex;
  }

  img {
    padding: 0px 20px;
    margin-right: 20px;
    border-right: 1px solid #dddddd;
    width: 155px;
    height: 24px;
  }

  ul {
    display: flex;
    align-items: center;

    li {
      margin-right: 20px;

      a {
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        color: #999999;
      }

      a:hover {
        color: #7d40e7;
      }

      a.chosen {
        color: #444444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 20px;

    strong {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #666666;
    }

    button {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      text-align: right;
      color: #7d40e7;
      border: 0;
      background: #fff;
      padding: 0;
    }

    @media (max-width: 740px) {
      align-items: center;
    }
  }
`;
