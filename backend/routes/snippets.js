const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Snippet = require('../models/Snippet');

router.post('/', [ auth, check('title','Title required').notEmpty(), check('code','Code required').notEmpty() ],
 async (req, res) => {
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, code, language, tags, isPublic } = req.body;
  try {
    const snippet = new Snippet({ title, code, language, tags, isPublic, owner: req.user.id });
    await snippet.save();
    res.json(snippet);
  } catch (err) { res.status(500).send('Server error'); }
});

router.get('/', auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({
      $or: [
        { isPublic: true },
        { owner: req.user.id }
      ]
    }).sort({ createdAt: -1 }).limit(100);
    res.json(snippets);
  } catch (err) { res.status(500).send('Server error'); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const snip = await Snippet.findById(req.params.id);
    if(!snip) return res.status(404).json({ msg: 'Snippet not found' });
    if(!snip.isPublic && snip.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
    res.json(snip);
  } catch (err) { res.status(500).send('Server error'); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let snip = await Snippet.findById(req.params.id);
    if(!snip) return res.status(404).json({ msg: 'Snippet not found' });
    if(snip.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
    const fields = ['title','code','language','tags','isPublic'];
    fields.forEach(f => { if(req.body[f] !== undefined) snip[f] = req.body[f]; });
    await snip.save();
    res.json(snip);
  } catch (err) { res.status(500).send('Server error'); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const snip = await Snippet.findById(req.params.id);
    if(!snip) return res.status(404).json({ msg: 'Snippet not found' });
    if(snip.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });
    await snip.remove();
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;

