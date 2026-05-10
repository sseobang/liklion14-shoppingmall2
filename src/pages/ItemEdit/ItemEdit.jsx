import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { items } from "../Main/ItemDummy";

export default function ItemEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = items.find((it) => it.id === Number(id));

  const [name, setName] = useState(item ? item.name : "");
  const [rating, setRating] = useState(item ? String(item.rating) : "");
  const [review, setReview] = useState(item ? String(item.review) : "");
  const [price, setPrice] = useState(item ? String(item.price) : "");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");

  const types = ["의류", "신발"];
  const genders = ["남성", "여성", "남녀공용"];
  const colors = [
    "red",
    "pink",
    "blue",
    "gray",
    "black",
    "denim",
    "multi",
    "rainbow",
    "holographic",
  ];

  const handleSubmit = () => {
    alert("상품이 수정되었습니다.");
    navigate(`/item/${id}`);
  };

  return (
    <Wrap>
      <ImageBox>
        {item && <PreviewImg src={item.image} alt={item.name} />}
        <UploadIcon
          xmlns="http://www.w3.org/2000/svg"
          width="55"
          height="61"
          viewBox="0 0 55 61"
          fill="none"
        >
          <path
            d="M2.5 40.3501V51.7882C2.5 53.5217 3.1535 55.1842 4.31673 56.4099C5.47996 57.6357 7.05764 58.3243 8.7027 58.3243H45.9189C47.564 58.3243 49.1417 57.6357 50.3049 56.4099C51.4681 55.1842 52.1216 53.5217 52.1216 51.7882V40.3501M27.3131 39.5379L27.3131 2.5M41.4907 16.652L27.3131 2.5L13.1355 16.652"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </UploadIcon>
      </ImageBox>

      <CenterLine />

      <Card>
        <CardTitle>상품 정보 수정</CardTitle>

        <Field>
          <Label>상품명</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>

        <Field>
          <Label>평점</Label>
          <Input value={rating} onChange={(e) => setRating(e.target.value)} />
        </Field>

        <Field>
          <Label>리뷰수</Label>
          <Input value={review} onChange={(e) => setReview(e.target.value)} />
        </Field>

        <Field>
          <Label>가격</Label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>

        <Field>
          <Label>사이즈</Label>
          <Input value={size} onChange={(e) => setSize(e.target.value)} />
        </Field>

        <Field>
          <Label>종류</Label>
          <BtnRow>
            {types.map((t) => (
              <TypeBtn
                key={t}
                $active={type === t}
                onClick={() => setType(t)}
              >
                {t}
              </TypeBtn>
            ))}
          </BtnRow>
        </Field>

        <Field>
          <Label>성별</Label>
          <BtnRow>
            {genders.map((g) => (
              <OptionBtn
                key={g}
                $active={gender === g}
                onClick={() => setGender(g)}
              >
                {g}
              </OptionBtn>
            ))}
          </BtnRow>
        </Field>

        <Field>
          <Label>색상</Label>
          <BtnRow>
            {colors.map((c) => (
              <OptionBtn
                key={c}
                $active={color === c}
                onClick={() => setColor(c)}
              >
                {c}
              </OptionBtn>
            ))}
          </BtnRow>
        </Field>

        <SubmitBtn onClick={handleSubmit}>상품 수정 완료</SubmitBtn>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 40px 160px 80px;
  display: flex;
  align-items: flex-start;
`;

const ImageBox = styled.div`
  position: relative;
  display: flex;
  width: 459px;
  height: 602px;
  margin-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #F0F0F0;
  overflow: hidden;
`;

const PreviewImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const UploadIcon = styled.svg`
  position: relative;
  width: 49.622px;
  height: 55.824px;
  flex-shrink: 0;
  aspect-ratio: 8/9;

  path {
    stroke-width: 5px;
    stroke: #B9B9B9;
  }
`;

const CenterLine = styled.div`
  width: 1.5px;
  height: 830.002px;
  margin-left: 100px;
  background: #EBEBEB;
`;

const Card = styled.div`
  display: flex;
  width: 285px;
  height: 739px;
  margin-left: 145px;
  margin-top: 40px;
  padding: 27px 33px;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25);
`;

const CardTitle = styled.h2`
  align-self: stretch;
  color: #1A1A1A;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #1A1A1A;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 6px;
`;

const Label = styled.label`
  align-self: stretch;
  color: #6C6C6C;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #6C6C6C;
  border-radius: 5px;
  background: #fff;
  font-family: Pretendard;
  font-size: 13px;
  color: #333;
  outline: none;
`;

const BtnRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  width: 100%;
`;

const OptionBtn = styled.button`
  width: 68px;
  height: 30px;
  padding: 0;
  border-radius: 5px;
  border: 1px solid ${({ $active }) => ($active ? "#DFDFDF" : "#F2F2F2")};
  background: ${({ $active }) => ($active ? "#DFDFDF" : "#F2F2F2")};
  color: #6c6c6c;
  font-family: Pretendard;
  font-size: 12px;
  cursor: pointer;
`;

const TypeBtn = styled.button`
  width: calc((100% - 7px) / 2);
  height: 30px;
  padding: 0;
  border-radius: 5px;
  border: 1px solid ${({ $active }) => ($active ? "#DFDFDF" : "#F2F2F2")};
  background: ${({ $active }) => ($active ? "#DFDFDF" : "#F2F2F2")};
  color: #6c6c6c;
  font-family: Pretendard;
  font-size: 12px;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #F2F2F2;
  background: #F2F2F2;
  color: #6c6c6c;
  font-family: Pretendard;
  font-size: 13px;
  cursor: pointer;
  margin-top: 8px;
`;
