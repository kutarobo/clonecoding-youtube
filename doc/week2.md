1. useSelector

   - redux store 상태에 접근 할 수 있는 hook
   - 사용법

     ```js
     // 1. 기본형태
     const result : any = useSelector(selector : Function, deps : any[])


     // 2. 리덕스에서 user 객체 정보를 가져온다.
     const user = useSelector((state) => state.user);

     // 3. 여러개의 값을 가져올 경우
     const { a, b } = useSelector(state => ({ a: state.a, state.b }), [])

     ```

   - 1. selector 는 우리가 기존에 connect 로 사용 할 때 mapStateToProps 와 비슷하다고 생각하시면 됩니다. deps 배열은 어떤 값이 바뀌었을 때 selector 를 재정의 할 지 설정해줍니다. deps 값을 생략 하시면 매번 렌더링 될 때마다 selector 함수도 새로 정의됩니다.

   - 3. 의 예시처럼 여러개의 값을 가져올 경우 상황에 따라 하나의 값이 바뀌어도 해당 셀렉터에 있는 모든 값이 렌더링되는 성능이슈가 발생 할 수 있음

     ```js
     // count와 prevCount 를 조회할때 다시 객체를 생성하는 방식으로 선언하였기 때문에 react 에서는 이를 상태가 바뀌는 것의 여부를 파악할수 없어 무조껀 다시 렌더링 해버리게 됩니다.
     const { count, prevCount } = useSelector((state: RootState) => ({
       count: state.countReducer.count,
       prevCount: state.countReducer.prevCount,
     }));

     // 해결방법. 독립선언.
     // 위에서 선언한것처럼 객체 방식이 아닌 각각의 값을 독립적으로 선언하게 되면 이에대한 상태변경여부를 파악할수 있어 상태가 최적화 될 수 있습니다.
     const count = useSelector((state: RootState) => state.countReducer.count);
     const prevCount = useSelector(
       (state: RootState) => state.countReducer.prevCount
     );
     ```

     - [참고 1 react-redux 에서 Hooks 사용하기 - 벨로퍼트](https://velog.io/@velopert/react-redux-hooks)
     - [참고 2 React 에서 useSelector 최적화 하는 3가지 방법.](https://blog.woolta.com/categories/1/posts/200)
     - [참고 3 redux document](https://react-redux.js.org/tutorials/quick-start)

2. todo

   - comment 기능 변경.
   - 무한 뎁스가 아닌 2depth 까지만.
     - parent id 규칙
       - parent가 가 parent가 있으면 그값을 공유해서 생성
       - parent가 가 parent가 없으면 parent의 id
   - component 구조
     - CommentList
       - Comment: parent: null
         - 댓글수 (본 코멘트의 아이디를 갖고 있는 코멘트 의 count)
         - 좋아요
         - more 버튼 O
         - Comment: parent: xxx
           - more 버튼 X
   - query
     - parent 가 없는 comment 만 pagination
     - ## parent id 로 comment 가져오기.
