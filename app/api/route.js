import { connectToDatabase, closeConnection } from './utils/db';

async function addOwner(req, res) {
    const { ownerAddress } = req.body;
    const { db } = await connectToDatabase();
    try {
        const result = await db.collection('owners').insertOne({ address: ownerAddress, wines: [] });
        console.log('Owner added:', ownerAddress);
        res.status(200).json({ success: true, message: 'Owner added successfully', data: result.insertedId });
    } catch (error) {
        console.error('Error adding owner:', error);
        res.status(500).json({ success: false, message: 'Error adding owner', error: error.message });
    } finally {
        await closeConnection();
    }
}

async function removeOwner(req, res) {
    const { ownerAddress } = req.body;
    const { db } = await connectToDatabase();
    try {
        const result = await db.collection('owners').deleteOne({ address: ownerAddress });
        console.log('Owner removed:', ownerAddress);
        res.status(200).json({ success: true, message: 'Owner removed successfully', data: result.deletedCount });
    } catch (error) {
        console.error('Error removing owner:', error);
        res.status(500).json({ success: false, message: 'Error removing owner', error: error.message });
    } finally {
        await closeConnection();
    }
}

async function getOwners(req, res) {
    const { db } = await connectToDatabase();
    try {
        const owners = await db.collection('owners').find({}, { projection: { _id: 0 } }).toArray();
        res.json({ success: true, data: owners });
    } catch (error) {
        console.error('Error getting owners:', error);
        res.json({ success: false, message: 'Error getting owners', error: error.message });
    } finally {
        await closeConnection();
    }
}

// Implement other functions like addWineByOwner, removeWineByOwner, etc. similarly...

export async function GET(req) {

    if (req?.query?.action === 'getOwners') {
        await getOwners(req, Response);
    } else {
        Response.json({ success: false, message: 'Route not found' });
    }
}

export async function POST(req) {

    if (req.method === 'POST' && req.query.action === 'addOwner') {
        await addOwner(req, Response);
    } else if (req.method === 'POST' && req.query.action === 'removeOwner') {
        await removeOwner(req, Response);
    } else {
        Response.json({ success: false, message: 'Route not found' });
    }
}
