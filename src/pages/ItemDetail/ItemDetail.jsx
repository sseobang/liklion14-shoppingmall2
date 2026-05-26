import { useParams } from "react-router-dom";
import styled from "styled-components";
import { items } from "../Main/ItemDummy";

export default function ItemDetail() {
  const { id } = useParams();
  const item = items.find((it) => it.id === Number(id));

  if (!item) {
    return <h1>상품을 찾을 수 없습니다.</h1>;
  }

  const rating = item.rating;

  return (
    <Wrap>
      <Left>
        <Img src={item.image} alt={item.name} />
      </Left>

      <Right>
        <Price>{item.price.toLocaleString("ko-KR")}원</Price>
        <Name>{item.name}</Name>
        <RatingRow>
          <Star>★</Star>
          <Rating>{rating}</Rating>
          <Review>리뷰 {item.review.toLocaleString("ko-KR")}</Review>
        </RatingRow>
      </Right>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 40px 160px;
  display: flex;
  gap: 80px;
`;

const Left = styled.div`
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Img = styled.img`
  width: 480px;
  height: auto;
  object-fit: contain;
`;

const Right = styled.div`
  flex: 1;
  padding-top: 80px;
`;

const Price = styled.h1`
  color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Name = styled.p`
  color: #333;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 12px;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Star = styled.span`
  color: #000;
  font-size: 14px;
`;

const Rating = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 500;
`;

const Review = styled.span`
  color: #888;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 400;
  margin-left: 12px;
`;
