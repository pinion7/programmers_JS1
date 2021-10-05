function solution(dirs) {
  // 분석
  // 좌표별 방문 여부를 확인 할 수 있도록 방향문자열을 담을 객체를 만들어야 한다.
  // 그리고 dirs을 기준으로 순회를 하며 방문한 지점에는 해당 방향문자를 넣어준다.
  // 순회 중에 첫 방문시에만 카운트를 올려주고, 그걸 나중에 결과값으로 반환하면 된다.
  // 또한 범위 밖으로는 진행되지 못하도록 범위를 제한하는 체킹 함수도 만들어줘야 한다.
  
  // 풀이
  // 1. 좌표별 이동방향 체킹을 위한 배열을 만든다.
  // 이동방향 체킹을 위해서 요소로 객체를 넣는다. 객체는 행(Y)좌표가 된다.
  const moveCheck = [];
  for (let i = 1; i <= 11; ++i) {
      moveCheck.push({});
  }
  // 그리고 이중 반복문으로 키를 열(X)좌표로 하면서, 속성값에는 빈배열을 주도록 세팅한다.
  for (let i = 0; i <= 10; ++i) {
      for (let j = 0; j <= 10; ++j) {
          moveCheck[i][j] = [];
      }
  }
  
  // 2. 범위 체킹 함수도 만들어 준다.    
  const isValid = (row, col) => {
      if (row >= 0 && row < 11 && col >= 0 && col < 11) {
          return true;
      }
      return false;
  }
  
  // 3. 이동 경로에 따른 좌표 변화와, 반대 방향 문자열을 담은 객체를 만든다.
  const moves = {
      U: [1, 0, 'D'],
      D: [-1, 0, 'U'],
      L: [0, -1, 'R'],
      R: [0, 1, 'L'],
  }
  
  // 4. 방문 길이 문제의 본 작업을 진행한다.
  // 1) 기본 세팅을 주고 시작한다. 시작 좌표는 (5, 5)이며, 방문된 경로 수도 당연히 0.
  let [Y, X] = [5, 5];
  let visitedPath = 0;
  
  // 2) 주어진 방향문자열을 탐색한다. moves 객체를 구조분해할당하여 각각의 값들을 담아낸다.
  // 3-1) 이동할 좌표가 유효한 범위인지를 체크하고 아니면 곧장 다음 방향을 탐색한다.
  // 3-2) 유효한 범위라면, 해당 좌표가 dirs[i]의 방향으로 이동한 경험이 있는지를 체크한다.
  // 4-1) 이동한 경험이 없다면 푸쉬하여, 방문이 된 경로로 입력해준다. 방문경로 카운트도 +1
  // 단, 주의할 점은 현재 방향에서 이동하는 방향만 체킹해줄게 아니라, 
  // 이동방향에서 현재방향으로 오는 경로도 체킹되었다고 가정해야 한다는 것이다. 
  // 그래서 애초에 moves에 반대방향 문자열을 담은 것이며, reverse Dir로 활용하는 것이다.
  // 4-2) 이동한 경험이 있다면 방문 경로가 카운트 되지 않을 것이다.
  // 5) 반복문의 마지막 줄에는 좌표를 이동시킨다.(방문여부와 상관없이 위치는 항상 변화한다.)
  for (let i = 0; i < dirs.length; ++i) {
      let [mY, mX, rDir] = moves[dirs[i]];
      if (!isValid(Y + mY, X + mX)) continue;
      
      if (!moveCheck[Y][X].includes(dirs[i])) {
          moveCheck[Y][X].push(dirs[i]);
          moveCheck[Y + mY][X + mX].push(rDir);
          ++visitedPath;
      }
      Y += mY;
      X += mX;
  }
  
  return visitedPath;
}