function solution(n, t, m, p) {
  // 분석
  // n은 진법을 뜻한다. 진행되는 숫자를 항상 이에 맞춰 변환해줘야 한다.
  // t개수는 튜브가 말한 개수일 뿐이다. 총 개수는 아니라는 점에 주의한다.
  // m은 참여하는 모든 인원의 수이다. 이를 바탕으로 튜브 차례를 계산해야한다.
  // p는 튜브의 순서이다. m과 함께 잘 핸들링하면 튜브 차례를 예측가능하다.
  
  // 풀이
  // 1. 튜브가 말한 결과를 담을 변수를 비롯, 시작 숫자와 순서 카운트도 선언한다
  // count 변수를 m으로 나눈 '나머지값'을 p의 순서를 체킹하는데 활용할 것이다.
  // p도 1차감하여 세팅해준다. 그래야 순서에 맞는 인덱스 매칭이 가능하다.
  // 이유는, 혹여 m과 p가 같다면 나머지 값으로 p가 매칭될 수 없기 때문이다.
  // 쉽게 정리하자면, 이제 순서가 1번째부터가 아닌 0번째부터 라고 생각하면 된다. 
  let result = '';
  let [num, count] = [0, 0];
  --p;
  
  while (result.length < t) {
      // 2. 진법 변환은 항시 반복문의 시작점에 가장 먼저 진행된다.
      // num은 변환 후 1상승시켜둔다.
      let convertN = (num++).toString(n);
      // 3. convertN을 기준으로 반복문을 하나 더 만든다.
      // 길이가 얼마나 긴지 알 수 없기 때문에 전부 훑어준다.
      // 조건이 일치하든 하지 않든 count는 항상 상승한다.
      for (let i = 0; i < convertN.length; ++i) {
          if (count++ % m === p) result += convertN[i];
      }
  }

  // 4. 결과값의 길이가 t를 더 초과하여 탈출할 수도 있다.
  // 따라서 목표길이만큼만 잘라주고, 대문자화시켜 반환한다.
  return result.slice(0, t).toUpperCase();
}