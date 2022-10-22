import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, media } from "styled-bootstrap-grid";
import { useRouter } from "next/router";

const Login = () => {
  const [Ul_id, setUl_id] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //file reading parameters

  let _dir = 'folder';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const doLogin = () => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ul_id: Ul_id,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/dashboard/${_dir}`);
        } else if (res.status === 400) {
          alert("Please enter correct credentials");
        } else if (res.status === 404) {
          alert("send proper data to server");
        } else {
          alert("server error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LoginCol xs={12} sm={12} md={12} lg={12}>
      <Wrapper>
        <CustomRow>
          <Content>
            <Heading>Log in</Heading>
          </Content>
        </CustomRow>
        <CustomRow>
          <Content>
            <Label>UL ID:</Label>
            <InputBox>
              <TextInput
                type="Ul_id"
                onChange={(e) => setUl_id(e.target.value)}
                value={Ul_id}
              ></TextInput>
            </InputBox>
            <Label>Password:</Label>
            <InputBox>
              <TextInput
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></TextInput>
            </InputBox>

            <LoginButton onClick={() => doLogin()}>Log in</LoginButton>
          </Content>
        </CustomRow>
      </Wrapper>
    </LoginCol>
  );
};

const Wrapper = styled(Container)`
  width: 100% !important;
`;

const CustomCol = styled(Col)`
  box-sizing: border-box;
`;

const CustomRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

const LoginCol = styled(CustomCol)`
  margin-top: 5rem;
  color: black;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const Content = styled(CustomCol)`
  padding: 0rem 2rem;
  width: 40%;
  ${media.xs`
  width: 100%;
  `}
  ${media.sm`
  width: 80%;
  `}
  ${media.md`
  width: 60%;
  `}
  ${media.lg`
  width: 40%;
  `}
`;

const Heading = styled.h2`
  font-weight: 600;
  color: black;
  font-size: 2rem;
`;

const InputBox = styled(CustomCol)`
  padding: 0;
  margin: 0;
`;

const Label = styled.p`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #1d2c39;
  text-align: left;
`;

const TextInput = styled.input`
  width: 100%;
  height: 3.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  text-align: left;
  color: black;
  background-color: #faf5e9;
  border: none;
  border-radius: 0.3rem;
  padding: 0.7rem 0.5rem;
  outline: none;
`;

const LoginButton = styled.button`
  font-weight: 600;
  outline: none;
  height: 3.5rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  padding: 0.7rem 0.5rem;
  color: black;
  background-color: #faf5e9;
  border: 0.2rem solid #faf5e9;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
`;

export default Login;
