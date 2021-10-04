function solution(board) {
  // 분석
  // 동적계획법으로 풀지 않고, 하나하나 탐색을 하여 최대 넓이를 구해가면
  // 정확성은 통과될지몰라도 효율성에서 최선의 결과가 나올 수 없다.
  // 똑같은 부분에 대한 반복연산 작업을 최소화하기 어렵기 때문이다.
  // 그러므로 동적계획법을 통해 현재 위치에서 구할 수 있는 최대 넓이를 저장하고
  // 다시 다음 위치에서 그 저장된 넓이를 이용하여 해당위치의 최대넓이를 구해가야 한다.
  // 그렇게 board의 좌표 전체를 훑으며 동적계획을 실행해간다면 
  // 중복연산을 최소화할 수 있게됨으로써 효율적으로 결과값을 산출해낼 수 있다. 

  // 풀이
  // 1. 우선 동적계획법을 실행하기 위한 동적프로그래밍 저장보드를 만든다.
  // 보통 동적계획법의 보드판은 0번행과 0번열을 더미로 두는 방식이 편리하다.
  // 그러므로 더미를 포함하면서 원본 board도 포괄할 수 있는 크기로 만들어야 한다.
  // 즉, 행과 열을 하나 더 늘려서 만들어 주면 된다.
  const dpBoard = [];
  for (let i = 0; i < board.length + 1; ++i) {
    dpBoard.push(new Array(board[0].length + 1).fill(0));
  }

  // 2. 최대 길이를 지속적으로 갱신하기 위한 한변의 길이 변수를 선언한다.
  // 정사각형의 넓이를 구하기 위한 공식은 한변의 길이 * 한변의 길이 이다.
  // 그러므로 동적보드판에 저장될 값은, 현 좌표에서 가능한 최대 변의 길이로 하면 된다.
  // 동적보드판에 한변의 길이를 저장해나감과 동시에 maxLen도 갱신해나가면 된다.
  let maxLen = 0;
  
  // 3. 원본 board를 순회하되 중요한 것은 반복문의 시작과 끝이다.
  // dpBoard의 경우 0번 행열이 더미이므로, 이를 제외한 행렬이 board의 크기와 같다. 
  // 중요한 포인트는, 좌표별 가능한 최대 정사각형의 변의 길이를 구하는 부분이다.
  // 일반적으로는 현좌표기준 행열을 아래와 우측으로 늘려가며 체크하는 게 편하겠지만
  // 동적계획법에서는 점진적으로 가능한 변의 길이를 재사용하는 방식이 필요하기 때문에
  // 역으로 행을 위로, 열을 좌측으로 늘렸을때 가능한 최대 크기를 고려해야 한다.
  // 즉, board를 순회해 갈수록 더 큰 정사각형을 만들 가능성(가용범위)이 늘어난다.
  for (let i = 1; i <= board.length; ++i) {
    for (let j = 1; j <= board[0].length; ++j) {
        
      // 4. 현재 좌표를 기준으로 열-1좌표, 행-1좌표, 행-1열-1좌표가 만들 수 있는 
      // 각 최대 길이를 서로 비교하여, 그 중 최소값을 구한다.
      // 거기에 +1을 한 값이 현재좌표가 만들 수 있는 가장 큰 한변의 길이가 된다.
      // 이런식으로 dpBoard의 현재 좌표에서 가능한 최대 길이를 저장해 나가고, 
      // maxLen도 비교하여 갱신해간다. 
      // 모든 작업은 board의 현재 좌표가 1일때만 진행하는 것이며, 
      // 0일땐 만들 수 없으므로 dp도 기존에 넣어둔 디폴트 값인 0을 유지하게 된다.
      if (board[i - 1][j - 1] === 1) {
        dpBoard[i][j] = Math.min(
          dpBoard[i - 1][j], 
          dpBoard[i][j - 1], 
          dpBoard[i - 1][j - 1]
        ) + 1;
        maxLen = Math.max(maxLen, dpBoard[i][j]);
      }
    }
  }

  // 5. 갱신된 최대길이가 나올 것이며 이를 곱하면 정사각형의 넓이를 알 수 있다.
  return maxLen ** 2;
}