import { useState } from "react";
import styled from "styled-components";
import img1 from "../../assets/images/Clothes01.png";
import img2 from "../../assets/images/Clothes02.png";
import img3 from "../../assets/images/Clothes03.png";
import img4 from "../../assets/images/Clothes04.png";
import img5 from "../../assets/images/Clothes05.png";
import { useNavigate } from "react-router-dom";
import { items } from "./ItemDummy";


const options = {
  gender: ["남성", "여성", "남녀공용"],
  color: ["red","pink","blue","black","gray","denim","multi","rainbow","holographic",],
  size: ["9", "10", "S", "M", "L", "XL"],
  priceRange: ["0~30", "31~60", "61~90"],
  type: ["의류", "신발"],
};

export default function Main() {
  const [modal, setModal] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("기본 정렬순");
  const [filters, setFilters] = useState({
    gender: "",
    color: "",
    size: "",
    priceRange: "",
    type: "",
  });
  const navigate=useNavigate();

  // 필터 옵션을 누르면 적용/해제
  const selectOption = (key, value) => {
    if (filters[key] === value) {
      setFilters({ ...filters, [key]: "" });
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  // 정렬 옵션을 누르면 적용
  const selectSort = (sortName) => {
    setSelectedSort(sortName);
    setSortOpen(false);
  };

  // 필터링된 상품 목록
  let shownItems = items.filter((item) => {
    if (filters.gender && item.gender !== filters.gender) return false;
    if (filters.color && item.color !== filters.color) return false;
    if (filters.size && item.size !== filters.size) return false;
    if (filters.type && item.type !== filters.type) return false;
    if (filters.priceRange) {
      const price = item.price / 10000;
      if (filters.priceRange === "0~30" && (price < 0 || price > 30)) return false;
      if (filters.priceRange === "31~60" && (price < 31 || price > 60)) return false;
      if (filters.priceRange === "61~90" && (price < 61 || price > 90)) return false;
    }
    return true;
  });

  // 정렬
  if (selectedSort === "평점 높은순") {
    shownItems = [...shownItems].sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === "리뷰 많은순") {
    shownItems = [...shownItems].sort((a, b) => b.review - a.review);
  }

  return (
    <Wrap>
      <Top>
        <FilterRow>
          <Chip $long={false} onClick={() => setModal("gender")}>
            성별 ⌵
          </Chip>
          <Chip $long={false} onClick={() => setModal("color")}>
            색상 ⌵
          </Chip>
          <Chip $long={true} onClick={() => setModal("size")}>
            사이즈 ⌵
          </Chip>
          <Chip $long={true} onClick={() => setModal("priceRange")}>
            가격대 ⌵
          </Chip>
          <Chip $long={false} onClick={() => setModal("type")}>
            종류 ⌵
          </Chip>
        </FilterRow>

        <SortArea>
          <SortWrap>
            <SortBtn onClick={() => setSortOpen(!sortOpen)}>
              <SortText>정렬순</SortText>
              <SortIcon
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
              >
                <path
                  d="M6.75 2.5625L8.625 0.5M8.625 0.5L10.5 2.5625M8.625 0.5L8.625 11.5M4.25 9.4375L2.375 11.5M2.375 11.5L0.5 9.4375M2.375 11.5L2.375 0.5"
                  stroke="#909090"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </SortIcon>
            </SortBtn>

            {sortOpen && (
              <SortBox>
                <SortItem
                  $active={selectedSort === "기본 정렬순"}
                  onClick={() => selectSort("기본 정렬순")}
                >
                  <span>기본 정렬순</span>
                  {selectedSort === "기본 정렬순" && <span>✓</span>}
                </SortItem>

                <SortItem
                  $active={selectedSort === "평점 높은순"}
                  onClick={() => selectSort("평점 높은순")}
                >
                  <span>평점 높은순</span>
                  {selectedSort === "평점 높은순" && <span>✓</span>}
                </SortItem>

                <SortItem
                  $active={selectedSort === "리뷰 많은순"}
                  onClick={() => selectSort("리뷰 많은순")}
                >
                  <span>리뷰 많은순</span>
                  {selectedSort === "리뷰 많은순" && <span>✓</span>}
                </SortItem>
              </SortBox>
            )}
          </SortWrap>
        </SortArea>
      </Top>

      <Grid>
        {shownItems.map((item) => (
          <Card key={item.id} onClick={()=>navigate(`/item/${item.id}`)}>
            <Img src={item.image} alt={item.name} />
            <Name>{item.name}</Name>
            <Price>{item.price.toLocaleString("ko-KR")}원</Price>
            <Review>리뷰 {item.review}</Review>
          </Card>
        ))}
      </Grid>

      {modal && (
        <Bg onClick={() => setModal("")}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <Head>
              <Title>
                {modal === "gender" && "성별"}
                {modal === "color" && "색상"}
                {modal === "size" && "사이즈"}
                {modal === "priceRange" && "가격대"}
                {modal === "type" && "종류"}
              </Title>
              <CloseBtn onClick={() => setModal("")}>×</CloseBtn>
            </Head>

            <Btns>
              {options[modal].map((item) => (
                <Option
                  key={item}
                  $active={filters[modal] === item}
                  onClick={() => selectOption(modal, item)}
                >
                  {item}
                </Option>
              ))}
            </Btns>
          </Modal>
        </Bg>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1440px;
  height: 1024px;
  background: #FFF;
  margin: 0 auto;
  padding: 20px 0 80px;
`;

const Top = styled.div`
  margin-bottom: 40px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 13px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const SortArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Chip = styled.button`
  display: flex;
  width: ${({ $long }) => ($long ? "72px" : "58px")};
  height: 33px;
  padding: ${({ $long }) =>
    $long ? "8px 11px 11px 10px" : "8px 10px 11px 10px"};
  justify-content: center;
  align-items: center;
  gap: ${({ $long }) => ($long ? "4px" : "5px")};

  border: none;
  border-radius: 20px;
  background: #f2f2f2;


  color: #616161;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  cursor: pointer;
`;

const SortWrap = styled.div`
  position: relative;
`;

const SortBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  border: none;
  cursor: pointer;
  background: transparent;
  padding: 0;
`;

const SortText = styled.span`
  color: #616161;
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
`;

const SortIcon = styled.svg`
  width: 10px;
  height: 11px;
  flex-shrink: 0;

  path {
    stroke-width: 1px;
    stroke: #909090;
  }
`;

const SortBox = styled.div`
  position: absolute;
  top: 34px;
  right: 0;
  width: 118px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  z-index: 10;
`;

const SortItem = styled.button`
  width: 100%;
  border: none;
  background: white;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ $active }) => ($active ? "#111" : "#999")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 57px 69px;
`;

const Card = styled.div``;

const Img = styled.img`
  aspect-ratio: 42/55;
  object-fit: contain;
  width: 181px;
  height: 237px;
`;

const Name = styled.p`
  color: #333;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
`;

const Price = styled.p`
  align-self: stretch;
  color: #000;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Review = styled.p`
  align-self: stretch;
  color: #A7A7A7;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Bg = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const Modal = styled.div`
  width: 320px;
  padding: 24px;
  border-radius: 25px;
  background: #FFF;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

const Title = styled.h3`
  color: #000;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CloseBtn = styled.button`
  color: #1A1A1A;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
`;

const Btns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Option = styled.button`
  border: none;
  padding: 10px 16px;
  border-radius: 18px;
  background: ${({ $active }) => ($active ? "#DFDFDF" : "#f1f1f1")};
  color: #666;
  cursor: pointer;
`;