import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png"
import homeUrl from "../../assets/icons/home_icon.png"
import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";

// 대문자로 시작! -> 대문자를 컨포넌트로 인식하기 때문
const LogoImage = styled.img`
    width: 166px;
    height: 141px;
`;

const HomeIcon = styled.img`
    width: 61px;
    height: 24px;
`;

const HeaderContainer = styled.div`
    padding-right: 160px;
    padding-left: 160px;
    display: flex;
    justify-content: space-between;
    
`;

const Button = styled.div`
    color: ${({ $active }) => ($active ? "#000" : "#6C6C6C")};
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;
    margin-top: 9px;
    cursor: pointer;
`;

const HeaderRight = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    display: inline-flex;
    align-items: flex-end;
    gap: 36px;
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 24px;
`;

export default function Header(){

    const {pathname} = useLocation(); // 현재 페이지 경로 불러오기
    const navigate = useNavigate();

    const isMain = pathname === "/";
    const isDetail = pathname.startsWith("/item/");
    const isAdd = pathname === "/add";
    const isEdit = pathname.startsWith("/edit/");

    const currentId = pathname.split("/")[2];

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleConfirm = () => {
        setShowDeleteModal(false);
        alert("상품이 삭제되었습니다.");
        navigate("/");
    };

    const handleEdit = () => {
        navigate(`/edit/${currentId}`);
    };

    return(
        <div>
            <HeaderContainer>
                <LogoImage src={logoUrl}/>
                <HeaderRight>
                    {isMain && (
                        <Button onClick={()=>navigate("/add")}>상품등록</Button>
                    )}
                    {isAdd && (
                        <Button $active>상품등록</Button>
                    )}
                    {isDetail && (
                        <ButtonRow>
                            <Button onClick={()=>navigate("/add")}>상품등록</Button>
                            <Button onClick={()=>setShowDeleteModal(true)}>상품삭제</Button>
                            <Button onClick={handleEdit}>상품수정</Button>
                        </ButtonRow>
                    )}
                    {isEdit && (
                        <ButtonRow>
                            <Button onClick={()=>navigate("/add")}>상품등록</Button>
                            <Button onClick={()=>setShowDeleteModal(true)}>상품삭제</Button>
                            <Button $active>상품수정</Button>
                        </ButtonRow>
                    )}
                    <HomeIcon src={homeUrl} onClick={()=>navigate("/")} style={{cursor:"pointer"}}/>
                </HeaderRight>
            </HeaderContainer>

            {showDeleteModal && (
                <ModalBg onClick={()=>setShowDeleteModal(false)}>
                    <ModalBox onClick={(e)=>e.stopPropagation()}>
                        <ModalText>상품을 삭제하시겠습니까?</ModalText>
                        <ModalBtns>
                            <ConfirmBtn onClick={handleConfirm}><BtnLabel>확인</BtnLabel></ConfirmBtn>
                            <CancelBtn onClick={()=>setShowDeleteModal(false)}><BtnLabel>취소</BtnLabel></CancelBtn>
                        </ModalBtns>
                    </ModalBox>
                </ModalBg>
            )}
        </div>
    );
}

const ModalBg = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const ModalBox = styled.div`
    width: 296px;
    height: 136px;
    padding: 28px 24px 20px;
    background: #FFF;
    border-radius: 25px;
    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ModalText = styled.p`
    color: #000;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const ModalBtns = styled.div`
    display: flex;
    gap: 10px;
`;

const ConfirmBtn = styled.button`
    display: flex;
    width: 102px;
    padding: 8px 0;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #F2F2F2;
    background: #F2F2F2;
    cursor: pointer;

    &:active {
        border: 1px solid #D0D0D0;
        background: #D0D0D0;
    }
`;

const CancelBtn = styled.button`
    display: flex;
    width: 102px;
    padding: 8px 0;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #F2F2F2;
    background: #F2F2F2;
    cursor: pointer;

    &:active {
        border: 1px solid #D0D0D0;
        background: #D0D0D0;
    }
`;

const BtnLabel = styled.span`
    align-self: stretch;
    color: #333;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
`;