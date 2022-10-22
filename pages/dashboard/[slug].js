import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, media } from "styled-bootstrap-grid";
import { AiTwotoneLock, AiOutlineSetting } from "react-icons/ai";
import { BiArrowBack, BiBorderBottom } from "react-icons/bi";
import { FiSave, FiUnlock } from "react-icons/fi";
import { GrSend } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";

export async function getStaticProps(context) {
  let slug = context?.params?.slug;
  console.log(slug)
  let data = [];
  await fetch(
    "http://localhost:3000/api/readFile",

    {
      body: slug,
      method: "POST",
    }
  )
    .then((x) => x.text())
    .then(async (res) => {
      data = res;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

const Dashboard = ({ data }) => {
  const [toggleLock, setToggleLock] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [value, setValue] = useState(data);
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
    content: value,
  });

  const insertData = async () => {
    const response = await fetch(`http://localhost:3000/api/writeFile`, {
      body: JSON.stringify({ value }),
      method: "POST",
    });
    if (response.status === 200) {
      alert("Data saved successfully");
    } else {
      alert("Edit Failed");
    }
  };

  if (!editor) {
    return null;
  }
  return (
    <CustomContainer>
      <CustomCol xs={12} sm={12} md={12} lg={12}>
        <Menu xs={3} sm={3} md={3} lg={3}>
          <TitleContainer>
            <Text>Dashboard</Text>
          </TitleContainer>
          <ButtonWrapper>
            <Lock
              hide={toggleLock}
              onClick={() => {
                setToggleLock(true);
                setShowContent(true);
              }}
            >
              Lock
              <AiTwotoneLock style={{ padding: ".1rem 0rem 0rem .1rem" }} />
            </Lock>
            <UnlockedButtonContainer hide={toggleLock}>
              <Save onClick={() => insertData()}>
                Save <FiSave style={{ padding: ".1rem 0rem 0rem .1rem" }} />
              </Save>
              <UnLock
                onClick={() => {
                  setToggleLock(false);
                  setShowContent(false);
                }}
              >
                UnLock <FiUnlock style={{ padding: ".1rem 0rem 0rem .1rem" }} />{" "}
              </UnLock>
              <Publish>
                Publish
                <GrSend style={{ padding: ".1rem 0rem 0rem .1rem" }} />{" "}
              </Publish>
              <Setting>
                Setting
                <AiOutlineSetting
                  style={{ padding: ".1rem 0rem 0rem .1rem" }}
                />{" "}
              </Setting>
              <ViewPage>
                View Page{" "}
                <VscOpenPreview style={{ padding: ".1rem 0rem 0rem .1rem" }} />{" "}
              </ViewPage>
            </UnlockedButtonContainer>
            <Buttons>
              Go back
              <BiArrowBack style={{ padding: ".1rem 0rem 0rem .1rem" }} />{" "}
            </Buttons>
            <Buttons>Edit People card</Buttons>
          </ButtonWrapper>
        </Menu>
        <Content xs={9} sm={9} md={9} lg={9}>
          <div>
            <TextWrapper>
              <TopText visible={showContent}>
                please lock the page to bage to began editing
              </TopText>
              <LogoutSection>
                <p>Welcome ...</p>
                <LogoutButton onClick={() => router.push("/login")}>
                  Logout
                </LogoutButton>
              </LogoutSection>
            </TextWrapper>
            <Text style={{ color: "black" }}>Home Slides</Text>
          </div>
          <Wrapper visible={showContent}>
            <EditorContent editor={editor} />
          </Wrapper>
        </Content>
      </CustomCol>
    </CustomContainer>
  );
};
const CustomContainer = styled(Container)`
  box-sizing: border-box;
  max-width: 100%;
`;
const CustomCol = styled(Col)`
  display: flex;
`;

const InputText = styled.input`
  max-width: 100%;
`;

const Menu = styled(CustomCol)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: grey;
  padding: 0;
  height: 100vh;
`;
const Content = styled(CustomCol)`
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  background-color: red;
  height: 5rem;
  width: 100%;
`;
const Text = styled.h1`
  color: white;
  font-weight: bold;
  text-align: left;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Buttons = styled.button`
  padding: 0.3rem;
  margin-top: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
  display: flex;
  width: 8rem;
`;
const Save = styled(Buttons)``;
const UnLock = styled(Buttons)``;

const Setting = styled(Buttons)``;

const Publish = styled(Buttons)``;

const ViewPage = styled(Buttons)``;

const Lock = styled(Buttons)`
  display: ${(props) => (props.hide === true ? "none" : "block")};
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UnlockedButtonContainer = styled.div`
  display: ${(props) => (props.hide === true ? "block" : "none")};
`;

const TopText = styled.p`
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: red;
  visibility: ${(props) => (props.visible === true ? "hidden" : "visible")};
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  padding: 0.5rem;
  display: ${(props) => (props.visible === true ? "block" : "none")};
`;
const ContentSection = styled.div``;
const CustomInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
`;

const LogoutSection = styled.div`
  display: flex;
`;

const LogoutButton = styled.button`
  height: 1.5rem;
  margin: 1rem;
`;

export default Dashboard;
