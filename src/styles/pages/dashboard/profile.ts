import styled, { css } from "styled-components";

interface ContainerProps {
  danger?: boolean;
}

export const AboutUser = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-width: 1010px;
  margin: 0 auto;
`;

export const ProfileContainer = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--shape);
  width: 100%;
  /* max-width: 500px; */
  height: max-content;
  flex-basis: 400px;
  flex-grow: 1;
  padding: 24px;
  border-radius: 4px;
  gap: 32px;
  .avatar {
    position: relative;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    .user {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border: 2px solid var(--secondary);
      border-radius: 50%;
      img {
        width: 100%;
        border-radius: 50%;
        transition: var(--transition);
      }
      svg {
        position: absolute;
        display: none;
        width: 100%;
        max-width: 50px;
        height: 100%;
        max-height: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: var(--transition);
      }
      &:hover {
        img {
          filter: brightness(0.6);
        }
        svg {
          display: block;
        }
      }
    }
    > svg {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    .about {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    p {
      color: var(--text);
      /* line-height: 125%; */
      word-wrap: break-word;
      text-align: justify;
      &.date::first-letter {
        text-transform: capitalize;
      }
      &.warn {
        color: var(--white);
        background: var(--attention);
        padding: 12px 16px;
        border-radius: 4px;
        width: 100%;
        overflow: hidden;
        position: relative;
        &:before {
          position: absolute;
          content: "⚠";
          left: -4.5%;
          opacity: 0.35;
          font-size: 8rem;
          top: -150%;
          @media (max-width: 624px) {
            top: -80%;
          }
        }
      }
      &.error {
        color: var(--white);
        background: var(--error);
        padding: 12px 16px;
        border-radius: 4px;
        width: 100%;
        overflow: hidden;
        position: relative;
        &:before {
          position: absolute;
          content: "✖";
          left: -4.5%;
          opacity: 0.35;
          font-size: 8rem;
          top: -150%;
          @media (max-width: 624px) {
            top: -80%;
          }
        }
      }
      &.obs {
        color: var(--white);
        background: var(--shape-dark);
        padding: 12px 16px;
        border-radius: 4px;
        width: 100%;
        overflow: hidden;
        position: relative;
        &:before {
          position: absolute;
          content: "ℹ️";
          left: -0.5%;
          opacity: 0.35;
          font-size: 8rem;
          top: -150%;
          @media (max-width: 624px) {
            top: -80%;
          }
        }
      }
    }
    > button {
      border: 1px solid var(--primary);
      background: var(--primary-lowopacity);
      width: 100%;
      padding: 8px 16px;
      border-radius: 4px;
      color: var(--white);
      cursor: pointer;
      transition: var(--transition);
      &:hover {
        filter: brightness(1.25);
      }
    }
    &.danger-zone {
      button {
        border: 1px solid var(--error);
        background: var(--error-lowopacity);
        &:hover {
          filter: brightness(1.25);
        }
      }
    }
  }
  ${({ danger }) =>
    danger &&
    css`
      border: 1px solid var(--error);
    `}
  dt {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--primary);
    font-weight: bold;
    font-size: 16px;
    text-transform: capitalize;
    line-height: 100%;
    width: 100%;
    border-image: linear-gradient(to right, var(--primary), transparent) 1;
    border-bottom: 1px solid;
    padding-bottom: 4px;
    margin: 8px 0;
    transition: var(--transition);
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
