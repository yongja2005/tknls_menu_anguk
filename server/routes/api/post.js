import  express  from 'express'

// Model
import Post from '../../models/post'
import User from '../../models/user'
import Category from '../../models/category'
import Comment from '../../models/comment'

import auth from '../../middleware/auth'
import moment from 'moment'

const router = express.Router()

import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
		bucket: "tknls-menu/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});


// @route			POST api/post/image
// @desc			Creator a Post
// @access		Private
// 임시 저장 공간에 올려놓기("제출하기 전까지만 가지고 있기")
router.post("/image", uploadS3.array("upload", 10), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});


//  @route    GET api/post
//  @desc     More Loading Posts
//  @access   public
router.get("/skip/:skip", async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .skip(Number(req.params.skip))
      .limit(6)
      .sort({ date: -1 });

    const categoryFindResult = await Category.find();
    const result = { postFindResult, categoryFindResult, postCount };

    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "더 이상 포스트가 없습니다" });
  }
});


// @route			POST api/post
// @desc			Create a Post
// @access		Private
router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, "req");
		const { title, contents, fileUrl, creator, category } = req.body;
		//req.body.title, req.body.contents ... 같이 들어오는 모든 정보를 req.body에 지정한 N개만 집어넣음
		const newPost = await Post.create({
			// await 안쓰려면 });.exec() 를 써줘야함
			title,
      contents,
      fileUrl,
      creator: req.user.id,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
    });

		const findResult = await Category.findOne({
      categoryName: category,
    });

		console.log(findResult, "find result*********")

		if( findResult === undefined ) {
			const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else if( findResult === null ) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else {
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    }
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.log(e);
  }
});

// @route    POST api/post/:id
// @desc     Detail Post
// @access   Public

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});


// [Comments Route]
// @route Get api/post/:id/comments
// @desc  Get All Comments
// @access public
router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id)
      .populate({
      // server/model/post.js 에서 "comments: [" 해당
      path: "comments",
      });
    const result = comment.comments;
    console.log(result, "comment load");
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format("YYYY-MM-DD hh:mm:ss"),
  });
  console.log(newComment, "newComment");
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});


// @route    Delete api/post/:id
// @desc     Delete a Post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      // server/model/user.js에서 posts, comments로 사용
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});


// @route   GET api/post/:id/edit
// @desc    Edit post
// @access  Private
router.get("/:id/edit", auth, async(req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    .populate("creator", "name")
    res.json(post)
  } catch(e) {
    console.error(e)
  }
})

router.post("/:id/edit", auth, async(req, res, next) => {
  console.log(req, "api/post/:id/edit")
  // const {body: {title, contents, fileUrl, category, id}} = req
  const {body: {title, contents, fileUrl, id}} = req

  try {
    const modified_post = await Post.findByIdAndUpdate(
      id, {
        // 수정한 날짜가 반영될지는 추후에 선택
        // title, contents, fileUrl, category, date: moment().format("YYYY-MM-DD hh:mm:ss")
        title, contents, fileUrl, date: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      { new: true }
    )
    console.log(modified_post, ":modified_post")
    res.redirect(`/api/post/${modified_post.id}`)
  } catch(e) {
    console.log(e)
    next(e)
  }
})


// @@ Category
router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          // $는 기본적인 몽구스 사용법이 아님
          $regex: req.params.categoryName,
          $options: "i",
        },
      },
      // "posts" => model/category.js 에서 찾으라는 뜻
      "posts")
      .populate({ path: "posts" });
    console.log(result, "Category Find result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});


export default router;